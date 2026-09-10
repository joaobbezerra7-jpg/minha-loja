import { Routes } from '@angular/router';
import { SetorCadastroComponent } from './setor-cadastro/setor-cadastro.component';

export const routes: Routes = [
  { path: '', redirectTo: 'cadastro-setor', pathMatch: 'full' },
  { path: 'cadastro-setor', component: SetorCadastroComponent }
];