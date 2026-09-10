import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { produtos } from './produtos'; 

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

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {

    // CRIA O FORMULÁRIO
    this.formularioProduto = this.formBuilder.group({

      // SETOR DO PRODUTO
      idsetor: ['', Validators.required],

      // NOME DO PRODUTO
      produto: ['', Validators.required],

      // DESCRIÇÃO DO PRODUTO
      descricao_produto: [''],

      // VALOR DO PRODUTO
      valor_unitario: ['', Validators.required],

      unidade: [''],

      // QUANTIDADE EM ESTOQUE
      estoque: ['', Validators.required]

    });
  }

  // SELECIONA A FOTO DO PRODUTO
  selecionarFoto(event: Event): void {

    // PEGA O CAMPO DE ARQUIVO
    const input = event.target as HTMLInputElement;

    // VERIFICA SE UMA FOTO FOI SELECIONADA
    if (input.files && input.files.length > 0) {

      // PEGA A FOTO SELECIONADA
      const arquivo = input.files[0];

      // CRIA UMA PRÉVIA DA FOTO
      const leitor = new FileReader();

      leitor.onload = () => {

        // MOSTRA A FOTO NA TELA
        this.fotoPreview = leitor.result as string;
      };

      // LÊ A FOTO
      leitor.readAsDataURL(arquivo);
    }
  }

  // CADASTRA O PRODUTO
  cadastrarProduto(): void {

    if (this.formularioProduto.invalid) {
  
      this.formularioProduto.markAllAsTouched();
  
      return;
    }
  
    produtos.push({
      ...this.formularioProduto.value,
      foto: this.fotoPreview
    });
  
    console.log('Produto cadastrado:', produtos);
  
    alert('Produto cadastrado com sucesso!');
  }

  // VAI PARA A LISTA DE PRODUTOS
  verProdutos(): void {
    this.router.navigate(['/lista']);
  }

}