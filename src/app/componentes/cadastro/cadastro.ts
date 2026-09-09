
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-cadastro',
  imports: [ReactiveFormsModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro {

  formCadastro = this.fb.group({
    nome: [''],
    cpf: [''],
    email: [''],
    dataNascimento: [''],
    cep: ['']
  });

  constructor(private fb: FormBuilder) {}

  salvar() {
    console.log(this.formCadastro.value);
  }

}

