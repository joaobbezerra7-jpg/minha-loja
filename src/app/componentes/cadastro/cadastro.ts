import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css'
})
export class CadastroComponent {
  private fb = inject(FormBuilder);
  private clienteService = inject(ClienteService);
  private router = inject(Router);

  errorMessage: string = '';
  successMessage: string = '';
  cepStatusMensagem: string = '';
  cepStatusClasse: string = '';
  loading: boolean = false;

  cadastroForm: FormGroup = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    cpf: ['', [Validators.required]],
    data_nascimento: ['', [Validators.required]],
   
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

    if (cepLimpo.length !== 8) {
      this.cepStatusMensagem = 'CEP inválido.';
      this.cepStatusClasse = 'status-erro';
      return;
    }

    this.cepStatusMensagem = 'Buscando endereço...';
    this.cepStatusClasse = 'status-carregando';

    this.clienteService.consultarCep(cepLimpo).subscribe({
      next: (dados) => {
        if (dados.erro) {
          this.cepStatusMensagem = 'CEP não encontrado.';
          this.cepStatusClasse = 'status-erro';
          return;
        }

        this.cadastroForm.patchValue({
          logradouro: dados.logradouro || '',
          bairro: dados.bairro || '',
          cidade: dados.localidade || '',
          uf: dados.uf || ''
        });

        this.cepStatusMensagem = 'Endereço localizado!';
        this.cepStatusClasse = 'status-sucesso';
      },
      error: () => {
        this.cepStatusMensagem = 'Erro ao consultar o CEP.';
        this.cepStatusClasse = 'status-erro';
      }
    });
  }

  onSubmit(): void {
    if (this.cadastroForm.invalid) {
      this.cadastroForm.markAllAsTouched();
      this.errorMessage = 'Preencha todos os campos obrigatórios corretamente.';
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

    this.clienteService.cadastrarCliente(payload).subscribe({
      next: () => {
        this.loading = false;
        this.successMessage = 'Cadastro realizado com sucesso!';
        this.cepStatusMensagem = '';
      },
      error: (err) => {
        this.loading = false;
        if (err.status === 409) {
          this.errorMessage = 'E-mail ou CPF já cadastrado no sistema.';
        } else {
          this.errorMessage = 'Erro ao realizar o cadastro. Verifique os dados enviados.';
        }
      }
    });
  }

  irParaLogin(): void {
    this.router.navigate(['/login']);
  }
}