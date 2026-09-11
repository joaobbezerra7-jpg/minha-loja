import { Component } from '@angular/core';
import { produtos } from '../../produto/produtos';
import { carrinho } from '../../carrinho/carrinho';


@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent {

  produtos = produtos;

  constructor(private router: Router) {}

  adicionarAoCarrinho(produto: any): void {

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