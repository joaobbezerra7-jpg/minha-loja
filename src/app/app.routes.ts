import { Routes } from '@angular/router';

import { CarrinhoComponent } from './carrinho/carrinho.component';
import { ProdutoComponent } from './produto/produto';
import { ListaComponent } from './components/lista/lista.component';

export const routes: Routes = [

  {
    path: 'carrinho',
    component: CarrinhoComponent
  },

  {
    path: 'produto',
    component: ProdutoComponent
  },

  {
    path: 'lista',
    component: ListaComponent
  },

  {
    path: '',
    redirectTo: 'produto',
    pathMatch: 'full'
  }

];