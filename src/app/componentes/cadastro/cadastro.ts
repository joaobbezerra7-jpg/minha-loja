import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from '../../services/cliente-service'; 

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css'
})
export class CadastroComponent {
  private fb = inject(FormBuilder);
  private pessoaService = inject(ClienteService);
  private router = inject(Router);

  errorMessage: string = '';
  successMessage: string = '';
  cepStatusMessage: string = '';
  cepStatusType: string = '';
  loading: boolean = false;

  cadastroForm: FormGroup = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    cpf: ['', [Validators.required]],
    data_nascimento: ['', [Validators.required]],
    sexo: ['', [Validators.required]],
    telefone: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(6)]],
    cep: ['', [Validators.required]],
    logradouro: ['', [Validators.required]],
    numero: ['', [Validators.required]],
    bairro: ['', [Validators.required]],
    uf: ['', [Validators.required, Validators.maxLength(2)]],
    cidade: ['', [Validators.required]]
  });

  buscarCep(): void {
    const cepValor = this.cadastroForm.get('cep')?.value || '';
    const cepLimpo = cepValor.replace(/\D/g, '');

    if (cepLimpo.length !== 8) return;

    this.cepStatusMessage = 'Buscando endereço...';
    this.cepStatusType = 'loading';

    this.pessoaService.consultarCep(cepLimpo).subscribe({
      next: (dados) => {
        if (dados.erro) {
          this.cepStatusMessage = 'CEP não encontrado.';
          this.cepStatusType = 'error';
          return;
        }

        this.cadastroForm.patchValue({
          logradouro: dados.logradouro || '',
          bairro: dados.bairro || '',
          cidade: dados.localidade || '',
          uf: dados.uf || ''
        });

        this.cepStatusMessage = 'Endereço localizado!';
        this.cepStatusType = 'success';
      },
      error: () => {
        this.cepStatusMessage = 'Erro ao consultar o CEP.';
        this.cepStatusType = 'error';
      }
    });
  }

  onSubmit(): void {
    if (this.cadastroForm.invalid) {
      this.cadastroForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const payload = {
      ...this.cadastroForm.value,
      cpf: this.cadastroForm.value.cpf.replace(/\D/g, ''),
      telefone: this.cadastroForm.value.telefone.replace(/\D/g, ''),
      cep: this.cadastroForm.value.cep.replace(/\D/g, '')
    };

    this.pessoaService.cadastrarPessoa(payload).subscribe({
      next: () => {
        this.loading = false;
        this.successMessage = 'Cadastro realizado com sucesso!';
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.status === 409 
          ? 'E-mail ou CPF já cadastrado.' 
          : 'Falha ao realizar cadastro. Verifique os dados.';
      }
    });
  }
}

