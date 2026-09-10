import { Routes } from '@angular/router';

import { LojaComponent } from './loja/loja.component';
import { ProdutoComponent } from './produto/produto';

export const routes: Routes = [

  {
    path: '',
    component: LojaComponent,
  },

  {
    path: 'cadastro-produto',
    component: ProdutoComponent
  }


]
