import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LojaComponent } from './loja/loja.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LojaComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('minha-loja');
}
