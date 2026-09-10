import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProdutoComponent } from './produto/produto';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ProdutoComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}