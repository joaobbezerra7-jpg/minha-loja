import { Routes } from '@angular/router';

import { CarrinhoComponent } from './carrinho/carrinho.component';
<<<<<<< HEAD
import { ProdutoComponent } from './produto/produto';
import { ListaComponent } from './components/lista/lista.component';

export const routes: Routes = [

=======

export const routes: Routes = [
>>>>>>> 2eeb029c79f35b08bcc3ebfab59f319a6294b7f4
  {
    path: 'carrinho',
    component: CarrinhoComponent
  },
<<<<<<< HEAD

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

=======
  {
    path: '',
    redirectTo: 'carrinho',
    pathMatch: 'full'
  }
>>>>>>> 2eeb029c79f35b08bcc3ebfab59f319a6294b7f4
];