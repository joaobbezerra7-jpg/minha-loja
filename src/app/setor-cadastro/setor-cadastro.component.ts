import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SetorService, Setor } from '../services/setor.service';

@Component({
  selector: 'app-setor-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './setor-cadastro.component.html',
  styleUrls: ['./setor-cadastro.component.css']
})
export class SetorCadastroComponent implements OnInit {
  formSetor!: FormGroup;
  carregando: boolean = false;
  mensagemSucesso: string | null = null;
  mensagemErro: string | null = null;

  constructor(
    private fb: FormBuilder,
    private setorService: SetorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formSetor = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
    });
  }

  onSubmit(): void {
    if (this.formSetor.invalid) {
      this.formSetor.markAllAsTouched();
      return;
    }

    this.carregando = true;
    this.mensagemSucesso = null;
    this.mensagemErro = null;

    const novoSetor: Setor = {
      nome: this.formSetor.value.nome.trim()
    };

    this.setorService.cadastrarSetor(novoSetor).subscribe({
      next: (setorCadastrado) => {
        this.mensagemSucesso = `Setor "${setorCadastrado.nome}" cadastrado com sucesso!`;
        this.formSetor.reset();
        this.carregando = false;

        // Redireciona automaticamente para a lista após 800ms
        setTimeout(() => {
          this.router.navigate(['/setores']);
        }, 800);
      },
      error: (err) => {
        this.mensagemErro = 'Erro ao cadastrar o setor.';
        this.carregando = false;
        console.error(err);
      }
    });
  }
}