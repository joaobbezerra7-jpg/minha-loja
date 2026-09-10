import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-loja',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './loja.component.html',
  styleUrl: './loja.component.css'
})

export class LojaComponent {
  title = 'minha-loja'
}
