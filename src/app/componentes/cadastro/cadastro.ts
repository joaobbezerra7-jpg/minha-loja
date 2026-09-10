import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { ClienteService } from '../../services/cliente-service';


@Component({
  selector: 'app-cadastro',
  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule
  ],

  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css'
})


export class CadastroComponent {


  private fb = inject(FormBuilder);

  private clienteService =
    inject(ClienteService);

  private router =
    inject(Router);

  private http =
    inject(HttpClient);


  errorMessage: string = '';

  successMessage: string = '';

  cepStatusMensagem: string = '';

  cepStatusClasse: string = '';

  loading: boolean = false;


  // =========================================================
  // FORMULÁRIO
  // =========================================================

  cadastroForm: FormGroup =
    this.fb.group({

      nome: [
        '',
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ],

      cpf: [
        '',
        [
          Validators.required
        ]
      ],

      data_nascimento: [
        '',
        [
          Validators.required
        ]
      ],

      telefone: [
        '',
        [
          Validators.required
        ]
      ],

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      senha: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ],

      cep: [
        '',
        [
          Validators.required
        ]
      ],

      logradouro: [
        '',
        [
          Validators.required
        ]
      ],

      numero: [
        '',
        [
          Validators.required
        ]
      ],

      bairro: [
        '',
        [
          Validators.required
        ]
      ],

      uf: [
        '',
        [
          Validators.required,
          Validators.maxLength(2)
        ]
      ],

      cidade: [
        '',
        [
          Validators.required
        ]
      ]

    });


  // =========================================================
  // BUSCAR CEP
  // =========================================================

  buscarCep(): void {


    const cepValor =
      this.cadastroForm
        .get('cep')
        ?.value || '';


    const cepLimpo =
      cepValor.replace(/\D/g, '');


    // Verificar CEP

    if (cepLimpo.length !== 8) {

      this.cepStatusMensagem =
        'CEP inválido. Digite 8 números.';

      this.cepStatusClasse =
        'status-erro';

      return;

    }


    this.cepStatusMensagem =
      'Buscando endereço...';

    this.cepStatusClasse =
      'status-carregando';


    // =====================================================
    // VIA CEP
    // =====================================================

    this.http

      .get<any>(
        `https://viacep.com.br/ws/${cepLimpo}/json/`
      )

      .subscribe({

        next: (dados: any) => {


          console.log(
            'Resposta da ViaCEP:',
            dados
          );


          // CEP não encontrado

          if (dados.erro) {

            this.cepStatusMensagem =
              'CEP não encontrado.';

            this.cepStatusClasse =
              'status-erro';

            return;

          }


          // =================================================
          // PREENCHER CAMPOS
          // =================================================

          this.cadastroForm.patchValue({

            logradouro:
              dados.logradouro || '',

            bairro:
              dados.bairro || '',

            cidade:
              dados.localidade || '',

            uf:
              dados.uf || ''

          });


          this.cepStatusMensagem =
            'Endereço localizado!';

          this.cepStatusClasse =
            'status-sucesso';


          console.log(
            'Endereço preenchido automaticamente.'
          );

        },


        error: (err: any) => {


          console.error(
            'Erro ao consultar ViaCEP:',
            err
          );


          this.cepStatusMensagem =
            'Erro ao consultar o CEP.';

          this.cepStatusClasse =
            'status-erro';

        }

      });

  }


  // =========================================================
  // CADASTRAR CLIENTE
  // =========================================================

  onSubmit(): void {


    console.log(
      '================================='
    );

    console.log(
      'BOTÃO CADASTRAR PRESSIONADO'
    );

    console.log(
      '================================='
    );


    // =====================================================
    // VERIFICAR FORMULÁRIO
    // =====================================================

    if (this.cadastroForm.invalid) {


      console.log(
        'Formulário inválido.'
      );


      this.cadastroForm.markAllAsTouched();


      this.errorMessage =
        'Preencha todos os campos obrigatórios corretamente.';


      return;

    }


    // =====================================================
    // PEGAR OS DADOS
    // =====================================================

    const payload = {


      ...this.cadastroForm.value,


      cpf:
        this.cadastroForm.value.cpf
          .replace(/\D/g, ''),


      telefone:
        this.cadastroForm.value.telefone
          .replace(/\D/g, ''),


      cep:
        this.cadastroForm.value.cep
          .replace(/\D/g, '')

    };


    console.log(
      'DADOS QUE SERÃO ENVIADOS:',
      payload
    );


    // =====================================================
    // LIMPAR FORMULÁRIO
    // =====================================================

    this.cadastroForm.reset();


    this.cepStatusMensagem = '';

    this.cepStatusClasse = '';

    this.errorMessage = '';

    this.successMessage =
      'Cadastro enviado.';


    console.log(
      'FORMULÁRIO LIMPO.'
    );


    // =====================================================
    // ATIVAR LOADING
    // =====================================================

    this.loading = true;


    // =====================================================
    // ENVIAR PARA FASTAPI
    // =====================================================

    this.clienteService

      .salvarCliente(payload)

      .subscribe({

        // ===============================================
        // SUCESSO
        // ===============================================

        next: (resposta: any) => {


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


          this.loading = false;


          this.successMessage =
            'Cadastro realizado com sucesso!';

        },


        // ===============================================
        // ERRO
        // ===============================================

        error: (err: any) => {


          console.error(
            '================================='
          );

          console.error(
            'ERRO AO ENVIAR PARA FASTAPI'
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


          this.loading = false;


          if (err.status === 409) {


            this.errorMessage =
              'E-mail ou CPF já cadastrado no sistema.';


          }

          else if (err.status === 422) {


            this.errorMessage =
              'Os dados enviados não estão no formato esperado pelo servidor.';


          }

          else if (err.status === 0) {


            this.errorMessage =
              'Não foi possível conectar ao FastAPI.';


          }

          else {


            this.errorMessage =
              'Erro ao realizar o cadastro.';

          }

        }

      });

  }


  // =========================================================
  // IR PARA LOGIN
  // =========================================================

  irParaLogin(): void {


    this.router.navigate([
      '/login'
    ]);

  }

}