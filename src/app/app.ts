import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
<<<<<<< HEAD
<<<<<<< HEAD
import { LojaComponent } from './loja/loja.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LojaComponent],
=======
=======
import { LojaComponent } from './loja/loja.component';
>>>>>>> a69e0393f8790b775ac6c8681d6957886439822d
import { ProdutoComponent } from './produto/produto';

@Component({
  selector: 'app-root',
<<<<<<< HEAD
  imports: [
    RouterOutlet,
    ProdutoComponent
  ],
>>>>>>> 9a11c85025001bd50b1e2fb3f7f2edb2106492b4
=======
  imports: [RouterOutlet, ProdutoComponent, LojaComponent],
>>>>>>> a69e0393f8790b775ac6c8681d6957886439822d
  templateUrl: './app.html',
  styleUrl: './app.css'

})

export class App {
}