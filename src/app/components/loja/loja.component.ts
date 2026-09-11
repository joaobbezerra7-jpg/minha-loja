
import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { RouterLink } from '@angular/router';

import { produtos as produtosCadastrados } from '../produto/produtos';

import { carrinho } from '../carrinho/carrinho';


export interface Produto {

  idproduto?: number;

  idsetor?: number;

  produto: string;

  descricao_produto?: string;

  valor_unitario: number;

  unidade: string;

  estoque: number;

  foto?: string;

}


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


  ngOnInit(): void {

    this.produtos = produtosCadastrados;

    this.produtosExibidos = [

      ...this.produtos

    ];


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

