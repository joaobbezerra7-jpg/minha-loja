
import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';

import { carrinho } from './carrinho';


@Component({

  selector: 'app-carrinho',

  standalone: true,

  imports: [CommonModule],

  templateUrl: './carrinho.component.html',

  styleUrl: './carrinho.component.css'

})


export class CarrinhoComponent {

  // ARRAY COMPARTILHADO DO CARRINHO

  carrinho = carrinho;


  constructor(

    private router: Router

  ) {}


  // =========================================================
  // AUMENTAR QUANTIDADE
  // =========================================================

  aumentar(item: any): void {

    item.quantidade++;

  }


  // =========================================================
  // DIMINUIR QUANTIDADE
  // =========================================================

  diminuir(item: any): void {

    if (item.quantidade > 1) {

      item.quantidade--;

    }

  }


  // =========================================================
  // REMOVER PRODUTO
  // =========================================================

  remover(item: any): void {

    const indice =

      carrinho.indexOf(item);


    if (indice !== -1) {

      carrinho.splice(indice, 1);

    }

  }


  // =========================================================
  // CALCULAR SUBTOTAL
  // =========================================================

  subtotal(): number {

    return carrinho.reduce(

      (total, item) =>

        total +

        Number(
          item.produto.valor_unitario
        ) *

        item.quantidade,

      0

    );

  }


  // =========================================================
  // CALCULAR TOTAL
  // =========================================================

  total(): number {

    return this.subtotal();

  }


  // =========================================================
  // IR PARA A LOJA
  // =========================================================

  irParaLoja(): void {

    this.router.navigate([
      '/loja'
    ]);

  }


  // =========================================================
  // FINALIZAR PEDIDO
  // =========================================================

  finalizarPedido(): void {

    alert(
      'Pedido preparado para finalização!'
    );

  }

}

