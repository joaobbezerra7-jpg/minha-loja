
import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

import { CarrinhoService } from '../../services/carrinho-service';
import { Produto, ProdutoService } from '../../services/produto-service';

import { PedidoService } from '../../services/pedido-service';
import { PedidoProdutoService } from '../../services/pedido-produto-service';

interface ItemCarrinho {
  produto: Produto;
  quantidade: number;
}

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css'
})
export class CarrinhoComponent implements OnInit {

  carrinho: ItemCarrinho[] = [];

  constructor(
    private router: Router,
    private carrinhoService: CarrinhoService,
    private produtoService: ProdutoService,
    private pedidoService: PedidoService,
    private pedidoProdutoService: PedidoProdutoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarCarrinho();
  }

  carregarCarrinho(): void {
    const idpessoaSalvo = localStorage.getItem('idpessoa');

    if (!idpessoaSalvo) {
      console.error('Cliente não identificado.');
      return;
    }

    const idpessoa = Number(idpessoaSalvo);

    this.carrinhoService.listarCarrinho(idpessoa).subscribe({
      next: (itens) => {

        if (itens.length === 0) {
          this.carrinho = [];
          this.cdr.detectChanges();
          return;
        }

        const requisicoes = itens.map(item =>
          this.produtoService.buscarProduto(item.idproduto)
        );

        forkJoin(requisicoes).subscribe({
          next: (produtos) => {

            this.carrinho = itens.map((item, indice) => ({
              produto: produtos[indice],
              quantidade: item.quantidade
            }));

            this.cdr.detectChanges();
          },

          error: (err) => {
            console.error(
              'Erro ao buscar produtos do carrinho:',
              err
            );
          }
        });
      },

      error: (err) => {
        console.error(
          'Erro ao buscar carrinho:',
          err
        );
      }
    });
  }

  aumentar(item: ItemCarrinho): void {
    const idpessoaSalvo = localStorage.getItem('idpessoa');

    if (!idpessoaSalvo || !item.produto.idproduto) {
      return;
    }

    const idpessoa = Number(idpessoaSalvo);
    const novaQuantidade = item.quantidade + 1;

    this.carrinhoService
      .alterarQuantidade(
        idpessoa,
        item.produto.idproduto,
        novaQuantidade
      )
      .subscribe({
        next: () => {
          item.quantidade = novaQuantidade;
          this.cdr.detectChanges();
        },

        error: (err) => {
          console.error(
            'Erro ao aumentar quantidade:',
            err
          );

          alert(
            err.error?.detail ||
            'Não foi possível aumentar a quantidade.'
          );
        }
      });
  }

  diminuir(item: ItemCarrinho): void {
    if (item.quantidade <= 1) {
      return;
    }

    const idpessoaSalvo = localStorage.getItem('idpessoa');

    if (!idpessoaSalvo || !item.produto.idproduto) {
      return;
    }

    const idpessoa = Number(idpessoaSalvo);
    const novaQuantidade = item.quantidade - 1;

    this.carrinhoService
      .alterarQuantidade(
        idpessoa,
        item.produto.idproduto,
        novaQuantidade
      )
      .subscribe({
        next: () => {
          item.quantidade = novaQuantidade;
          this.cdr.detectChanges();
        },

        error: (err) => {
          console.error(
            'Erro ao diminuir quantidade:',
            err
          );

          alert(
            err.error?.detail ||
            'Não foi possível diminuir a quantidade.'
          );
        }
      });
  }

  remover(item: ItemCarrinho): void {
    const idpessoaSalvo = localStorage.getItem('idpessoa');

    if (!idpessoaSalvo || !item.produto.idproduto) {
      return;
    }

    const idpessoa = Number(idpessoaSalvo);

    this.carrinhoService
      .removerProduto(
        idpessoa,
        item.produto.idproduto
      )
      .subscribe({
        next: () => {
          this.carrinho = this.carrinho.filter(
            itemCarrinho =>
              itemCarrinho !== item
          );

          this.cdr.detectChanges();
        },

        error: (err) => {
          console.error(
            'Erro ao remover produto:',
            err
          );

          alert(
            err.error?.detail ||
            'Não foi possível remover o produto.'
          );
        }
      });
  }

  formatarValor(valor: number | string): string {
    return Number(valor)
      .toFixed(2)
      .replace('.', ',');
  }

  subtotal(): number {
    return this.carrinho.reduce(
      (total, item) =>
        total +
        Number(item.produto.valor_unitario) *
        item.quantidade,
      0
    );
  }

  total(): number {
    return this.subtotal();
  }

  irParaLoja(): void {
    this.router.navigate(['/loja']);
  }

  finalizarPedido(): void {

    if (this.carrinho.length === 0) {
      alert('O carrinho está vazio.');
      return;
    }

    const idpessoaSalvo = localStorage.getItem('idpessoa');

    if (!idpessoaSalvo) {
      alert('Não foi possível identificar o cliente.');
      return;
    }

    const idpessoa = Number(idpessoaSalvo);

    const pedido = {
      idpessoa: idpessoa,
      data_pedido: new Date()
        .toISOString()
        .split('T')[0]
    };

    console.log(
      'PEDIDO QUE SERÁ ENVIADO:',
      pedido
    );

    this.pedidoService.criarPedido(pedido).subscribe({

      next: (resposta) => {

        console.log(
          'PEDIDO CRIADO COM SUCESSO!'
        );

        console.log(
          'RESPOSTA DO FASTAPI:',
          resposta
        );

        const idpedido = resposta.idpedido;

        if (idpedido === undefined) {

          console.error(
            'O FastAPI criou o pedido, mas não retornou o idpedido.'
          );

          alert(
            'O pedido foi criado, mas não foi possível identificar o número do pedido.'
          );

          return;
        }

        const requisicoesProdutos =
          this.carrinho.map((item) => {

            const produtoPedido = {
              idpedido: idpedido,
              idproduto: item.produto.idproduto!,
              quantidade: item.quantidade,
              valor_unitario: item.produto.valor_unitario
            };

            return this.pedidoProdutoService.adicionarProduto(
              idpedido,
              produtoPedido
            );
          });

        forkJoin(requisicoesProdutos).subscribe({

          next: () => {

            console.log(
              'TODOS OS PRODUTOS FORAM ADICIONADOS AO PEDIDO!'
            );

            /*
             * Somente agora que o pedido e todos os seus
             * produtos foram criados com sucesso,
             * finalizamos o carrinho atual.
             */
            this.carrinhoService
              .finalizarCarrinho(idpessoa)
              .subscribe({

                next: () => {

                  console.log(
                    'CARRINHO FINALIZADO COM SUCESSO!'
                  );

                  this.carrinho = [];

                  this.cdr.detectChanges();

                  alert(
                    `Pedido finalizado com sucesso! ID: ${idpedido}`
                  );

                  this.router.navigate(['/pedidos']);
                },

                error: (err) => {

                  console.error(
                    'ERRO AO FINALIZAR CARRINHO:',
                    err
                  );

                  alert(
                    'O pedido foi criado, mas não foi possível finalizar o carrinho.'
                  );
                }
              });
          },

          error: (err) => {

            console.error(
              'ERRO AO ADICIONAR PRODUTOS AO PEDIDO',
              err
            );

            alert(
              'O pedido foi criado, mas ocorreu um erro ao adicionar um ou mais produtos.'
            );
          }
        });
      },

      error: (err) => {

        console.error(
          'ERRO AO CRIAR PEDIDO',
          err
        );

        alert(
          'Não foi possível criar o pedido.'
        );
      }
    });
  }
}

