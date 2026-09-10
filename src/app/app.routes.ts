import { Routes } from '@angular/router';

import { ProdutoComponent } from './produto/produto';
import { ListaComponent } from './components/lista/lista.component';

export const routes: Routes = [

  // ROTA PARA CADASTRAR PRODUTOS
  {
    path: 'produto',
    component: ProdutoComponent
  },

  // ROTA PARA LISTAR OS PRODUTOS
  {
    path: 'lista',
    component: ListaComponent
  },

  // PÁGINA INICIAL
  {
    path: '',
    redirectTo: 'produto',
    pathMatch: 'full'
  }

];