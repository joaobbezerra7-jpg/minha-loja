import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { LojaComponent } from './loja/loja.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, LojaComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}