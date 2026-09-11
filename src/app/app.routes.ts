import { Routes } from '@angular/router';
import { CadastroComponent } from './componentes/cadastro/cadastro';
import { LojaComponent } from './loja/loja.component';
import { ProdutoComponent } from './produto/produto';

export const routes: Routes = [
  { path: '', component: LojaComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'cadastro-produto', component: ProdutoComponent }
];