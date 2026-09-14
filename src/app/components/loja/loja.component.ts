import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { RouterLink } from '@angular/router';

import { carrinho } from '../carrinho/carrinho';

import {
  Produto,
  ProdutoService
} from '../../services/produto-service';


@Component({
  selector: 'app-loja',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './loja.component.html',
  styleUrls: ['./loja.component.css']
})


export class LojaComponent implements OnInit {

  termoBusca: string = '';

  quantidadeCarrinho: number = 0;

  produtos: Produto[] = [];

  produtosExibidos: Produto[] = [];


  constructor(
    private produtoService: ProdutoService
  ) {}


  ngOnInit(): void {

    this.produtoService
      .listarProdutos()
      .subscribe({

        next: (produtos) => {

          console.log(
            'Produtos recebidos do FastAPI na Loja:',
            produtos
          );

          this.produtos = produtos;

          this.produtosExibidos = [...produtos];

        },

        error: (err) => {

          console.error(
            'Erro ao buscar produtos para a Loja:',
            err
          );

        }

      });


    // Atualiza a quantidade do carrinho
    this.atualizarQuantidadeCarrinho();

  }


  // =========================================================
  // BUSCAR PRODUTO
  // =========================================================

  executarBusca(): void {

    const termo =
      this.termoBusca
        .trim()
        .toLowerCase();


    if (!termo) {

      this.produtosExibidos = [
        ...this.produtos
      ];

      return;

    }


    this.produtosExibidos =
      this.produtos.filter(produto =>

        produto.produto
          .toLowerCase()
          .includes(termo)

        ||

        produto.descricao_produto
          ?.toLowerCase()
          .includes(termo)

      );

  }


  // =========================================================
  // ADICIONAR AO CARRINHO
  // =========================================================

  adicionarAoCarrinho(produto: Produto): void {

    const produtoExistente =
      carrinho.find(
        item => item.produto === produto
      );


    if (produtoExistente) {

      produtoExistente.quantidade++;

    }

    else {

      carrinho.push({

        produto: produto,

        quantidade: 1

      });

    }


    this.atualizarQuantidadeCarrinho();


    alert(
      'Produto adicionado ao carrinho!'
    );

  }


  // =========================================================
  // ATUALIZAR QUANTIDADE DO CARRINHO
  // =========================================================

  atualizarQuantidadeCarrinho(): void {

    this.quantidadeCarrinho =
      carrinho.reduce(

        (total, item) =>
          total + item.quantidade,

        0

      );

  }


  // =========================================================
  // CALCULAR PARCELA
  // =========================================================

  calcularValorParcela(

    valorTotal: number,

    parcelas: number

  ): number {

    return valorTotal / parcelas;

  }

}