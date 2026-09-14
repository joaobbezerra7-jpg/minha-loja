import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';

import { carrinho } from '../carrinho/carrinho';

import {
  Produto,
  ProdutoService
} from '../../services/produto-service';


@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent implements OnInit {

  produtos: Produto[] = [];

  constructor(
    private router: Router,
    private produtoService: ProdutoService
  ) {}

  ngOnInit(): void {

    this.produtoService
      .listarProdutos()
      .subscribe({

        next: (produtos) => {

          console.log(
            'Produtos recebidos do FastAPI:',
            produtos
          );

          this.produtos = produtos;

        },

        error: (err) => {

          console.error(
            'Erro ao buscar produtos:',
            err
          );

        }

      });

  }

  adicionarAoCarrinho(produto: Produto): void {

    const produtoExistente = carrinho.find(
      item => item.produto === produto
    );

    if (produtoExistente) {

      produtoExistente.quantidade++;

    } else {

      carrinho.push({

        produto: produto,

        quantidade: 1

      });

    }

    alert('Produto adicionado ao carrinho!');

  }

  verCarrinho(): void {

    this.router.navigate(['/carrinho']);

  }

}