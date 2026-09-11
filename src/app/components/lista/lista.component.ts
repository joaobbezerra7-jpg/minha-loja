import { Component } from '@angular/core';
import { produtos } from '../../produto/produtos';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent {

  produtos = produtos;

}