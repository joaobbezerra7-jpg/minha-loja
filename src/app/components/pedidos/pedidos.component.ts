
import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';

import {
  Pedido,
  PedidoService
} from '../../services/pedido-service';

import {
  PedidoProduto,
  PedidoProdutoService
} from '../../services/pedido-produto-service';


interface PedidoComProdutos extends Pedido {
  produtos: PedidoProduto[];
}


@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent implements OnInit {

  pedidos: PedidoComProdutos[] = [];


  constructor(
    private pedidoService: PedidoService,
    private pedidoProdutoService: PedidoProdutoService,
    private cdr: ChangeDetectorRef
  ) {}


  ngOnInit(): void {

    console.log('=================================');
    console.log('PEDIDOS COMPONENT INICIADO');
    console.log('=================================');


    const idpessoaSalvo = localStorage.getItem('idpessoa');


    console.log(
      'ID DA PESSOA NO LOCALSTORAGE:',
      idpessoaSalvo
    );


    if (!idpessoaSalvo) {

      console.error(
        'Não foi possível identificar o cliente.'
      );

      return;
    }


    const idpessoa = Number(idpessoaSalvo);


    console.log(
      'ID DA PESSOA CONVERTIDO:',
      idpessoa
    );


    this.pedidoService.listarPedidos().subscribe({

      next: (pedidos) => {

        console.log(
          'TODOS OS PEDIDOS RECEBIDOS:',
          pedidos
        );


        const pedidosDoCliente = pedidos.filter(
          pedido => pedido.idpessoa === idpessoa
        );


        console.log(
          'PEDIDOS DO CLIENTE:',
          pedidosDoCliente
        );


        if (pedidosDoCliente.length === 0) {

          this.pedidos = [];

          this.cdr.detectChanges();

          console.log(
            'Nenhum pedido encontrado para o cliente.'
          );

          return;
        }


        const requisicoes =
          pedidosDoCliente.map(

            pedido =>
              this.pedidoProdutoService.listarProdutos(
                pedido.idpedido!
              )

          );


        forkJoin(requisicoes).subscribe({

          next: (produtosPorPedido) => {

            this.pedidos =
              pedidosDoCliente.map(

                (pedido, indice) => ({

                  ...pedido,

                  produtos:
                    produtosPorPedido[indice]

                })

              );


            console.log(
              '================================='
            );

            console.log(
              'PEDIDOS COM PRODUTOS:',
              this.pedidos
            );

            console.log(
              'QUANTIDADE DE PEDIDOS:',
              this.pedidos.length
            );

            console.log(
              'IDS DOS PEDIDOS:',
              this.pedidos.map(
                pedido => pedido.idpedido
              )
            );

            console.log(
              '================================='
            );


            /*
             * Força o Angular a atualizar
             * a interface depois que os dados
             * foram carregados.
             */

            this.cdr.detectChanges();


            console.log(
              'CHANGE DETECTION EXECUTADO'
            );

          },


          error: (err) => {

            console.error(
              'Erro ao buscar produtos dos pedidos:',
              err
            );

          }

        });

      },


      error: (err) => {

        console.error(
          'Erro ao buscar pedidos:',
          err
        );

      }

    });

  }


  calcularTotal(
    pedido: PedidoComProdutos
  ): number {

    return pedido.produtos.reduce(

      (total, item) =>

        total +
        Number(item.valor_unitario) *
        item.quantidade,

      0

    );

  }


  calcularSubtotalItem(
    item: PedidoProduto
  ): number {

    return (
      Number(item.valor_unitario) *
      item.quantidade
    );

  }


  formatarValor(
    valor: number | string
  ): string {

    return Number(valor)
      .toFixed(2)
      .replace('.', ',');

  }

}

