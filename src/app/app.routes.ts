import { Routes } from '@angular/router';
import { CadastroComponent } from './componentes/cadastro/cadastro';
import { ProdutoComponent } from './produto/produto';

export const routes: Routes = [

  // ROTA PARA A ENTRADA DE PRODUTOS
  {
    path: 'produto',
    component: ProdutoComponent
  },

  { path: 'cadastro', component: CadastroComponent },
  {
    path: 'cadastro',
    component: CadastroComponent
  },

  // REDIRECIONA A PÁGINA INICIAL PARA PRODUTO
  {
    path: '',
    redirectTo: 'produto',
    pathMatch: 'full'
  }

]

