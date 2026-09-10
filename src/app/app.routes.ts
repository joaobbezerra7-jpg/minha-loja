import { Routes } from '@angular/router';
import { ProdutoComponent } from './produto/produto';

export const routes: Routes = [

  // ROTA PARA A ENTRADA DE PRODUTOS
  {
    path: 'produto',
    component: ProdutoComponent
  },

  // REDIRECIONA A PÁGINA INICIAL PARA PRODUTO
  {
    path: '',
    redirectTo: 'produto',
    pathMatch: 'full'
  }

]
