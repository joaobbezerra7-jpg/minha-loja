import { Routes } from '@angular/router';
import { SetorCadastroComponent } from './setor-cadastro/setor-cadastro.component';
import {  } from "./produto/produto";

export const routes: Routes = [

  { path: '', redirectTo: 
  'cadastro-setor',
   pathMatch: 'full' },
  { 
    path: 'cadastro-setor', component: SetorCadastroComponent 
  },

  {
    path: './produto/produto',
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
