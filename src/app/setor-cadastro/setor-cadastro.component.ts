import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SetorService } from '../services/setor.service';
import { Setor } from '../models/setor';

@Component({
  selector: 'app-setor-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './setor-cadastro.component.html',
  styleUrls: ['./setor-cadastro.component.css']
})
export class SetorCadastroComponent implements OnInit {
  formSetor: FormGroup;
  listaSetores: Setor[] = [];
  mensagemSucesso: string | null = null;
  
  // Controle para edição
  setorEmEdicao: Setor | null = null;

  constructor(
    private fb: FormBuilder,
    private setorService: SetorService
  ) {
    this.formSetor = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]]
    });
  }

  ngOnInit(): void {
    this.setorService.setores$.subscribe(setores => {
      this.listaSetores = setores;
    });
  }

  onSubmit(): void {
    if (this.formSetor.invalid) {
      this.formSetor.markAllAsTouched();
      return;
    }

    const nomeInput = this.formSetor.value.nome;

    if (this.setorEmEdicao && this.setorEmEdicao.idsetor) {
      // Modo Edição
      this.setorService.atualizarSetor(this.setorEmEdicao.idsetor, nomeInput);
      this.mensagemSucesso = `Setor ID ${this.setorEmEdicao.idsetor} atualizado para "${nomeInput}"!`;
      this.setorEmEdicao = null;
    } else {
      // Modo Cadastro
      const setorCriado = this.setorService.adicionarSetor(nomeInput);
      this.mensagemSucesso = `Setor "${setorCriado.nome}" cadastrado! (ID: ${setorCriado.idsetor})`;
    }

    this.formSetor.reset();
  }

  prepararEdicao(setor: Setor): void {
    this.setorEmEdicao = setor;
    this.formSetor.patchValue({ nome: setor.nome });
  }

  cancelarEdicao(): void {
    this.setorEmEdicao = null;
    this.formSetor.reset();
  }

  excluir(idsetor?: number): void {
    if (idsetor && confirm('Deseja realmente excluir esta categoria?')) {
      this.setorService.excluirSetor(idsetor);
      this.mensagemSucesso = 'Categoria excluída com sucesso!';
    }
  }
}