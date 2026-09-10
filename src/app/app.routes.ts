import { Routes } from '@angular/router';
import { SetorCadastroComponent } from './setor-cadastro/setor-cadastro.component';
import { SetorListaComponent } from './setor-lista/setor-lista';

export const routes: Routes = [
  { path: '', redirectTo: 'cadastro-setor', pathMatch: 'full' },
  { path: 'cadastro-setor', component: SetorCadastroComponent },
  { path: 'setores', component: SetorListaComponent },
  { path: '**', redirectTo: 'cadastro-setor' }
];