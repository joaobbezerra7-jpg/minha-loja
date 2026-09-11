
import { Component } from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';

import { produtos } from './produtos';

import { SetorService } from '../../services/setor.service';

import { Setor } from '../../models/setor';


@Component({

  selector: 'app-produto',

  standalone: true,

  imports: [ReactiveFormsModule],

  templateUrl: './produto.html',

  styleUrls: ['./produto.css']

})


export class ProdutoComponent {

  // DECLARA O FORMULÁRIO

  formularioProduto;


  // ARMAZENA A FOTO SELECIONADA

  fotoPreview: string = '';


  // ARMAZENA OS SETORES CADASTRADOS

  setores: Setor[] = [];


  constructor(

    private formBuilder: FormBuilder,

    private router: Router,

    private setorService: SetorService

  ) {

    // PEGA OS SETORES DO SERVIÇO

    this.setores = this.setorService.getSetores();


    // CRIA O FORMULÁRIO

    this.formularioProduto =

      this.formBuilder.group({

        // SETOR DO PRODUTO

        idsetor: [

          '',

          Validators.required

        ],

        // NOME DO PRODUTO

        produto: [

          '',

          Validators.required

        ],

        // DESCRIÇÃO DO PRODUTO

        descricao_produto: [''],

        // VALOR DO PRODUTO

        valor_unitario: [

          '',

          Validators.required

        ],

        // UNIDADE DO PRODUTO

        unidade: [

          '',

          Validators.required

        ],

        // QUANTIDADE EM ESTOQUE

        estoque: [

          '',

          Validators.required

        ]

      });

  }


  // =========================================================
  // SELECIONAR FOTO
  // =========================================================

  selecionarFoto(event: Event): void {

    const input =
      event.target as HTMLInputElement;


    if (

      input.files &&

      input.files.length > 0

    ) {

      const arquivo =
        input.files[0];


      const leitor =
        new FileReader();


      leitor.onload = () => {

        this.fotoPreview =
          leitor.result as string;

      };


      leitor.readAsDataURL(arquivo);

    }

  }


  // =========================================================
  // CADASTRAR PRODUTO
  // =========================================================

  cadastrarProduto(): void {

    // VERIFICA SE O FORMULÁRIO É VÁLIDO

    if (

      this.formularioProduto.invalid

    ) {

      this.formularioProduto
        .markAllAsTouched();

      return;

    }


    // PEGA OS DADOS DO FORMULÁRIO

    const dados =
      this.formularioProduto.value;


    // CRIA O PRODUTO

    const novoProduto = {

      idproduto:
        produtos.length + 1,

      idsetor:
        Number(dados.idsetor),

      produto:
        dados.produto,

      descricao_produto:
        dados.descricao_produto,

      valor_unitario:
        Number(dados.valor_unitario),

      unidade:
        dados.unidade,

      estoque:
        Number(dados.estoque),

      foto:
        this.fotoPreview

    };


    // ADICIONA O PRODUTO À LISTA

    produtos.push(novoProduto);


    // MOSTRA OS DADOS NO CONSOLE

    console.log(
      'Produto cadastrado:',
      novoProduto
    );


    console.log(
      'Todos os produtos:',
      produtos
    );


    // LIMPA O FORMULÁRIO

    this.formularioProduto.reset();

    this.fotoPreview = '';


    // MENSAGEM

    alert(
      'Produto cadastrado com sucesso!'
    );

  }


  // =========================================================
  // IR PARA LISTA DE PRODUTOS
  // =========================================================

  verProdutos(): void {

    this.router.navigate([
      '/lista'
    ]);

  }

}

