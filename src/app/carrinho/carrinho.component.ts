import { Component } from '@angular/core';
import { carrinho } from './carrinho';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css'
})
export class CarrinhoComponent {

  carrinho = carrinho;

  aumentar(item: any): void {
    item.quantidade++;
  }

  diminuir(item: any): void {
    if (item.quantidade > 1) {
      item.quantidade--;
    }
  }

  remover(item: any): void {
    const index = this.carrinho.indexOf(item);

    if (index !== -1) {
      this.carrinho.splice(index, 1);
    }
  }

  subtotal(): number {
    return this.carrinho.reduce(
      (total, item) =>
        total + Number(item.produto.valor_unitario) * item.quantidade,
      0
    );
  }
}