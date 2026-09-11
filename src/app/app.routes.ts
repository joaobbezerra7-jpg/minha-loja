import { Routes } from '@angular/router';

import { ProdutoComponent } from './components/produto/produto';
import { ListaComponent } from './components/lista/lista.component';
import { CarrinhoComponent } from './components/carrinho/carrinho.component';
import { LojaComponent } from './components/loja/loja.component';
import { CadastroComponent } from './components/cadastro/cadastro';
import { SetorCadastroComponent } from './components/setor-cadastro/setor-cadastro.component';
import { SetorListaComponent } from './components/setor-lista/setor-lista';

export const routes: Routes = [
  {
    path: 'produto',
    component: ProdutoComponent
  },
  {
    path: 'lista',
    component: ListaComponent
  },
  {
    path: 'carrinho',
    component: CarrinhoComponent
  },
  {
    path: 'loja',
    component: LojaComponent
  },
  {
    path: 'cadastro',
    component: CadastroComponent
  },
  {
    path: 'setor-cadastro',
    component: SetorCadastroComponent
  },
  {
    path: 'setor-lista',
    component: SetorListaComponent
  },
  {
    path: '',
    redirectTo: 'cadastro',
    pathMatch: 'full'
  }
];