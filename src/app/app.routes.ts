import { Routes } from '@angular/router';

import { CarrinhoComponent } from './carrinho/carrinho.component';

export const routes: Routes = [
  {
    path: 'carrinho',
    component: CarrinhoComponent
  },
  {
    path: '',
    redirectTo: 'carrinho',
    pathMatch: 'full'
  }
];