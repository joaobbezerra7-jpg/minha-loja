import { Routes } from '@angular/router';
import { SetorCadastroComponent } from './setor-cadastro/setor-cadastro.component';

export const routes: Routes = [
  { path: '', redirectTo: 'cadastro-setor', pathMatch: 'full' }, // Redireciona a raiz para a tela de cadastro
  { path: 'cadastro-setor', component: SetorCadastroComponent }
];