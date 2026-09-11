import { Routes } from '@angular/router';
import { ProdutoComponent } from './produto/produto';
import { SetorCadastroComponent } from './components/setor-cadastro/setor-cadastro.component';
import { ListaComponent } from './components/lista/lista.component';

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
