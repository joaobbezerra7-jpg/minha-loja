import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LojaComponent } from './loja/loja.component';
import { ProdutoComponent } from './produto/produto';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LojaComponent, ProdutoComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}