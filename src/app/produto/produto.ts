import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

export interface Setor {
  id_setor: number;
  nome: string;
}

@Component({
  selector: 'app-produto',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './produto.html',
  styleUrls: ['./produto.css']
})
export class ProdutoComponent implements OnInit {

  formularioProduto: FormGroup;
  fotoPreview: string = '';

  setores: Setor[] = [
    { id_setor: 1, nome: 'PROCESSADORES' },
    { id_setor: 2, nome: 'PLACAS DE VÍDEO' },
    { id_setor: 3, nome: 'MEMÓRIA RAM' },
    { id_setor: 4, nome: 'ARMAZENAMENTO (SSD/HD)' },
    { id_setor: 5, nome: 'FONTES E GABINETES' }
  ];

  constructor(private formBuilder: FormBuilder) {
    this.formularioProduto = this.formBuilder.group({
      idsetor: ['', Validators.required],
      produto: ['', Validators.required],
      descricao_produto: [''],
      valor_unitario: ['', [Validators.required, Validators.min(0.01)]],
      unidade: ['UN', Validators.required],
      estoque: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {}

  selecionarFoto(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const arquivo = input.files[0];
      const leitor = new FileReader();

      leitor.onload = () => {
        this.fotoPreview = leitor.result as string;
      };

      leitor.readAsDataURL(arquivo);
    }
  }

  cadastrarProduto(): void {
    if (this.formularioProduto.invalid) {
      this.formularioProduto.markAllAsTouched();
      return;
    }

    const payload = {
      id_setor: Number(this.formularioProduto.value.idsetor),
      descricao: this.formularioProduto.value.produto,
      preco_unitario: Number(this.formularioProduto.value.valor_unitario),
      unidade: this.formularioProduto.value.unidade,
      estoque: Number(this.formularioProduto.value.estoque)
    };

    console.log('Payload montado para o backend:', payload);
  }
}