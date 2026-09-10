import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SetorService } from '../services/setor.service'; // Ajustado de ../.. para ..
import { Setor } from '../models/setor';

@Component({
  selector: 'app-setor-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './setor-cadastro.component.html',
  styleUrls: ['./setor-cadastro.component.css']
})
export class SetorCadastroComponent {
  formSetor: FormGroup;
  mensagemSucesso: string | null = null;
  mensagemErro: string | null = null;
  carregando: boolean = false;

  constructor(
    private fb: FormBuilder,
    private setorService: SetorService
  ) {
    this.formSetor = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]]
    });
  }

  onSubmit(): void {
    if (this.formSetor.invalid) {
      this.formSetor.markAllAsTouched();
      return;
    }

    this.carregando = true;
    this.mensagemSucesso = null;
    this.mensagemErro = null;

    const novoSetor: Setor = {
      nome: this.formSetor.value.nome.trim()
    };

    this.setorService.criarSetor(novoSetor).subscribe({
      next: (resposta: Setor) => { // Tipado como Setor
        this.mensagemSucesso = `Setor "${resposta.nome}" cadastrado com sucesso! (ID: ${resposta.idsetor})`;
        this.formSetor.reset();
        this.carregando = false;
      },
      error: (err: any) => { // Tipado como any
        this.carregando = false;
        if (err.status === 409) {
          this.mensagemErro = 'Já existe um setor cadastrado com este nome.';
        } else if (err.error?.detail) {
          this.mensagemErro = typeof err.error.detail === 'string' 
            ? err.error.detail 
            : 'Erro de validação nos dados enviados.';
        } else {
          this.mensagemErro = 'Não foi possível se conectar ao servidor. Verifique se a API está rodando.';
        }
      }
    });
  }
}