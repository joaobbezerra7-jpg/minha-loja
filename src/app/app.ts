import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { LojaComponent } from './loja/loja.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink,],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
