import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
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

  // Contador para gerar IDs sequenciais (começa no 1)
  private proximoId: number = 1;

  constructor(private fb: FormBuilder) {
    this.formSetor = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]]
    });
  }

  onSubmit(): void {
    if (this.formSetor.invalid) {
      this.formSetor.markAllAsTouched();
      return;
    }

    this.mensagemSucesso = null;
    this.mensagemErro = null;

    // Usa o contador sequencial atual
    const idAtual = this.proximoId;

    const novoSetor: Setor = {
      idsetor: idAtual,
      nome: this.formSetor.value.nome.trim()
    };

    // Incrementa para o próximo cadastro
    this.proximoId++;

    // Imprime o objeto no console do navegador
    console.log('Setor cadastrado com sucesso:', novoSetor);

    // Feedback na tela e reseta o formulário
    this.mensagemSucesso = `Setor "${novoSetor.nome}" cadastrado no console com sucesso! (ID: ${novoSetor.idsetor})`;
    this.formSetor.reset();
  }
}