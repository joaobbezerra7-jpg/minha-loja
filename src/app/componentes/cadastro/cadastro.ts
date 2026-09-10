import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from '../../services/cliente-service'; 
import { HttpClient } from '@angular/common/http';

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
  private pessoaService = inject(ClienteService);
  private clienteService = inject(ClienteService);
  private router = inject(Router);
  private http = inject(HttpClient);

  errorMessage: string = '';
  successMessage: string = '';

  cepStatusMensagem: string = '';
  cepStatusClasse: string = '';

  loading: boolean = false;

  cadastroForm: FormGroup = this.fb.group({

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
  // BUSCAR ENDEREÇO PELO CEP
  // =========================================================

  buscarCep(): void {

    const cepValor = this.cadastroForm.get('cep')?.value || '';

    // Remove pontos, traços e qualquer caractere que não seja número
    const cepLimpo = cepValor.replace(/\D/g, '');

    // Verifica se o CEP possui exatamente 8 números
    if (cepLimpo.length !== 8) {

      this.cepStatusMensagem = 'CEP inválido. Digite 8 números.';
      this.cepStatusClasse = 'status-erro';

      return;
    }


    // Mensagem enquanto consulta a API
    this.cepStatusMensagem = 'Buscando endereço...';
    this.cepStatusClasse = 'status-carregando';


    // =========================================================
    // CONSULTA DIRETA À API VIACEP
    // =========================================================

    this.http
      .get<any>(
        `https://viacep.com.br/ws/${cepLimpo}/json/`
      )
      .subscribe({

        // Quando a API responder
        next: (dados: any) => {

          console.log('Resposta da ViaCEP:', dados);


          // Caso o CEP não exista
          if (dados.erro) {

            this.cepStatusMensagem = 'CEP não encontrado.';
            this.cepStatusClasse = 'status-erro';

            return;
          }


          // =====================================================
          // PREENCHER AUTOMATICAMENTE OS CAMPOS
          // =====================================================

          this.cadastroForm.patchValue({

            logradouro: dados.logradouro || '',

            bairro: dados.bairro || '',

            cidade: dados.localidade || '',

            uf: dados.uf || ''

          });


          // Mensagem de sucesso
          this.cepStatusMensagem = 'Endereço localizado!';
          this.cepStatusClasse = 'status-sucesso';

        },


        // Caso aconteça algum erro na consulta
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
  // ENVIAR CADASTRO
  // =========================================================

  onSubmit(): void {

    // Verifica se o formulário está inválido
    if (this.cadastroForm.invalid) {

      this.cadastroForm.markAllAsTouched();

      this.errorMessage =
        'Preencha todos os campos obrigatórios corretamente.';

      return;
    }


    // Ativa carregamento
    this.loading = true;

    this.errorMessage = '';
    this.successMessage = '';


    // =========================================================
    // PREPARAR DADOS PARA ENVIAR AO BACKEND
    // =========================================================

    const payload = {

      ...this.cadastroForm.value,

      // Remove caracteres do CPF
      cpf:
        this.cadastroForm.value.cpf
          .replace(/\D/g, ''),

      // Remove caracteres do telefone
      telefone:
        this.cadastroForm.value.telefone
          .replace(/\D/g, ''),

      // Remove caracteres do CEP
      cep:
        this.cadastroForm.value.cep
          .replace(/\D/g, '')

    };


    this.pessoaService.cadastrarCliente(payload).subscribe({
      next: () => {
        this.loading = false;
        this.successMessage = 'Cadastro realizado com sucesso!';
        this.cadastroForm.reset({ sexo: 'M' });
        this.cepStatusMensagem = '';
      },
      error: (err) => {
        this.loading = false;
        if (err.status === 409) {
          this.errorMessage = 'E-mail ou CPF já cadastrado no sistema.';
        } else {
          this.errorMessage = 'Erro ao realizar o cadastro. Verifique os dados enviados.';


    console.log(
      'Dados enviados para o backend:',
      payload
    );


    // =========================================================
    // ENVIAR PARA O FASTAPI
    // =========================================================

    this.clienteService
      .salvarCliente(payload)
      .subscribe({

        // Cadastro realizado
        next: (resposta) => {

          console.log(
            'Resposta do backend:',
            resposta
          );

          this.loading = false;

          this.successMessage =
            'Cadastro realizado com sucesso!';

          this.errorMessage = '';

          this.cepStatusMensagem = '';

        },


        // Erro no cadastro
        error: (err: any) => {

          console.error(
            'Erro ao cadastrar cliente:',
            err
          );

          this.loading = false;


          // CPF ou e-mail já cadastrado
          if (err.status === 409) {

            this.errorMessage =
              'E-mail ou CPF já cadastrado no sistema.';

          } else {

            this.errorMessage =
              'Erro ao realizar o cadastro. Verifique os dados enviados.';

          }

>>>>>>> c83db37950a3cc3a6df61275e33aa8c8b1a6bbd7
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