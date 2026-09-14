
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { produtos } from './produtos';

import { SetorService } from '../../services/setor.service';
import { Setor } from '../../models/setor';

import { ProdutoService } from '../../services/produto-service';


@Component({
  selector: 'app-produto',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './produto.html',
  styleUrls: ['./produto.css']
})
export class ProdutoComponent {

  formularioProduto;

  fotoPreview: string = '';

  setores: Setor[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private setorService: SetorService,
    private produtoService: ProdutoService
  ) {

    this.setores = this.setorService.getSetores();

    this.formularioProduto = this.formBuilder.group({

      idsetor: [
        '',
        Validators.required
      ],

      produto: [
        '',
        Validators.required
      ],

      descricao_produto: [
        ''
      ],

      valor_unitario: [
        '',
        Validators.required
      ],

      unidade: [
        '',
        Validators.required
      ],

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

    // Verificar formulário

    if (this.formularioProduto.invalid) {

      this.formularioProduto.markAllAsTouched();

      return;

    }


    const dados =
      this.formularioProduto.value;


    // =======================================================
    // DADOS QUE SERÃO ENVIADOS PARA O FASTAPI
    // =======================================================

    const novoProduto = {

      idsetor:
        Number(dados.idsetor),

      produto:
        dados.produto!,

      descricao_produto:
        dados.descricao_produto ?? '',

      valor_unitario:
        Number(dados.valor_unitario),

      unidade:
        dados.unidade!,

      estoque:
        Number(dados.estoque)

    };


    console.log(
      'Enviando produto para o FastAPI:',
      novoProduto
    );


    // =======================================================
    // ENVIAR PARA O BACKEND
    // =======================================================

    this.produtoService
      .salvarProduto(novoProduto)
      .subscribe({

        // ===================================================
        // SUCESSO
        // ===================================================

        next: (resposta) => {

          console.log(
            '================================='
          );

          console.log(
            'RESPOSTA DO FASTAPI:'
          );

          console.log(
            resposta
          );

          console.log(
            '================================='
          );


          // Limpar formulário

          this.formularioProduto.reset();


          // Limpar preview da foto

          this.fotoPreview = '';


          alert(
            'Produto cadastrado com sucesso!'
          );

        },


        // ===================================================
        // ERRO
        // ===================================================

        error: (err) => {

          console.error(
            '================================='
          );

          console.error(
            'ERRO AO CADASTRAR PRODUTO'
          );

          console.error(
            'Status:',
            err.status
          );

          console.error(
            'Erro:',
            err.error
          );

          console.error(
            '================================='
          );


          // Setor não encontrado

          if (err.status === 404) {

            alert(
              'O setor selecionado não foi encontrado.'
            );

          }


          // Dados inválidos

          else if (err.status === 422) {

            alert(
              'Os dados do produto estão em formato inválido.'
            );

          }


          // FastAPI indisponível

          else if (err.status === 0) {

            alert(
              'Não foi possível conectar ao FastAPI.'
            );

          }


          // Outros erros

          else {

            alert(
              'Erro ao cadastrar o produto.'
            );

          }

        }

      });

  }


  // =========================================================
  // VER PRODUTOS
  // =========================================================

  verProdutos(): void {

    this.router.navigate([
      '/lista'
    ]);

  }

}

