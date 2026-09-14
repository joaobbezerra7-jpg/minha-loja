import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { SetorService } from '../../services/setor.service';
import { Setor } from '../../models/setor';

@Component({
  selector: 'app-setor-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './setor-cadastro.component.html',
  styleUrl: './setor-cadastro.component.css'
})
export class SetorCadastroComponent {

  listaSetores: Setor[] = [];

  setorEmEdicao: number | null = null;

  mensagemSucesso = '';
  mensagemErro = '';

  formSetor: any;

  constructor(
    private formBuilder: FormBuilder,
    private setorService: SetorService
  ) {

    this.formSetor = this.formBuilder.group({
      nome: ['', [
        Validators.required,
        Validators.minLength(2)
      ]]
    });

    this.atualizarLista();
  }

  onSubmit(): void {

    if (this.formSetor.invalid) {
      this.formSetor.markAllAsTouched();
      return;
    }

    const nome = this.formSetor.value.nome?.trim();

    if (!nome) {
      return;
    }

    if (this.setorEmEdicao !== null) {

      this.setorService.atualizarSetor(
        this.setorEmEdicao,
        nome
      );

      this.mensagemSucesso =
        'Setor atualizado com sucesso!';

      this.setorEmEdicao = null;

    } else {

      this.setorService.adicionarSetor(nome);

      this.mensagemSucesso =
        'Setor cadastrado com sucesso!';
    }

    this.formSetor.reset();

    this.atualizarLista();

    setTimeout(() => {
      this.mensagemSucesso = '';
    }, 3000);
  }

  prepararEdicao(setor: Setor): void {

    if (setor.idsetor === undefined) {
      return;
    }

    this.setorEmEdicao = setor.idsetor;

    this.formSetor.patchValue({
      nome: setor.nome
    });

    this.mensagemSucesso = '';
    this.mensagemErro = '';
  }

  cancelarEdicao(): void {

    this.setorEmEdicao = null;

    this.formSetor.reset();

    this.mensagemSucesso = '';
    this.mensagemErro = '';
  }

  excluir(idsetor: number | undefined): void {

    if (idsetor === undefined) {
      return;
    }

    const setor = this.listaSetores.find(
      item => item.idsetor === idsetor
    );

    if (!setor) {
      return;
    }

    const confirmar = confirm(
      `Deseja realmente excluir o setor "${setor.nome}"?`
    );

    if (!confirmar) {
      return;
    }

    this.setorService.excluirSetor(idsetor);

    if (this.setorEmEdicao === idsetor) {
      this.cancelarEdicao();
    }

    this.atualizarLista();

    this.mensagemSucesso =
      'Setor excluído com sucesso!';

    setTimeout(() => {
      this.mensagemSucesso = '';
    }, 3000);
  }

  private atualizarLista(): void {
    this.listaSetores =
      this.setorService.getSetores();
  }
}