import { Routes } from '@angular/router';
import { Cadastro } from './componentes/cadastro/cadastro';
import { ListaCadastros } from './componentes/lista-cadastros/lista-cadastros';

export const routes: Routes = [
    {path:"",redirectTo: 'cadastro',pathMatch:'full' },
    {path:'cadastro',component:Cadastro },
    {path:'lista-cadastro',component:ListaCadastros },
];
