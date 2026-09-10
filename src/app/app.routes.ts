import { Routes } from '@angular/router';
import { CadastroComponent } from './componentes/cadastro/cadastro';

export const routes: Routes = [
    {path:"",redirectTo: 'cadastro',pathMatch:'full' },
    {path:'cadastro',component:CadastroComponent },

];
