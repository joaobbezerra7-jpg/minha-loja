
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Produto, ProdutoService } from '../../services/produto-service';
import { CarrinhoService } from '../../services/carrinho-service';

@Component({
  selector: 'app-loja',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './loja.component.html',
  styleUrls: ['./loja.component.css']
})
export class LojaComponent implements OnInit {
  termoBusca: string = '';
  quantidadeCarrinho: number = 0;
  produtos: Produto[] = [];
  produtosExibidos: Produto[] = [];

  constructor(
    private produtoService: ProdutoService,
    private carrinhoService: CarrinhoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.produtoService.listarProdutos().subscribe({
      next: (produtos) => {
        this.produtos = produtos;
        this.produtosExibidos = [...produtos];
        this.cdr.detectChanges();
      },
      error: (err) => console.error('🔴 LOJA: erro ao buscar produtos:', err)
    });

    this.atualizarQuantidadeCarrinho();
  }

  executarBusca(): void {
    const termo = this.termoBusca.trim().toLowerCase();

    if (!termo) {
      this.produtosExibidos = [...this.produtos];
      this.cdr.detectChanges();
      return;
    }

    this.produtosExibidos = this.produtos.filter(produto =>
      produto.produto.toLowerCase().includes(termo) ||
      produto.descricao_produto?.toLowerCase().includes(termo)
    );

    this.cdr.detectChanges();
  }

  adicionarAoCarrinho(produto: Produto): void {
    const idpessoaSalvo = localStorage.getItem('idpessoa');

    if (!idpessoaSalvo) {
      alert('Não foi possível identificar o cliente.');
      return;
    }

    const idpessoa = Number(idpessoaSalvo);

    this.carrinhoService
      .adicionarProduto(idpessoa, produto.idproduto!, 1)
      .subscribe({
        next: () => {
          this.quantidadeCarrinho++;
          alert('Produto adicionado ao carrinho!');
        },
        error: (err) => {
          console.error(
            'Erro ao adicionar produto ao carrinho:',
            err
          );

          alert(
            err.error?.detail ||
            'Não foi possível adicionar o produto ao carrinho.'
          );
        }
      });
  }

  atualizarQuantidadeCarrinho(): void {
    this.quantidadeCarrinho = 0;
  }

  calcularValorParcela(valorTotal: number, parcelas: number): number {
    return valorTotal / parcelas;
  }
}

