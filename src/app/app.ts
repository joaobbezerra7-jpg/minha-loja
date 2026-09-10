import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
<<<<<<< HEAD
import { LojaComponent } from './loja/loja.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LojaComponent],
=======
import { ProdutoComponent } from './produto/produto';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ProdutoComponent
  ],
>>>>>>> 9a11c85025001bd50b1e2fb3f7f2edb2106492b4
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}