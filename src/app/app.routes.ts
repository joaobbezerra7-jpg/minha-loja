import { Routes } from '@angular/router';

import { ProdutoComponent } from './produto/produto';
import { SetorCadastroComponent } from './components/setor-cadastro/setor-cadastro.component';
import { ListaComponent } from './components/lista/lista.component';

export const routes: Routes = [

  // ROTA PARA CADASTRAR PRODUTOS
  {
    path: './produto/produto',
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
