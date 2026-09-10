import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder) {

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

      // UNIDADE DO PRODUTO
      unidade: ['', Validators.required],

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

    // VERIFICA SE O FORMULÁRIO É VÁLIDO
    if (this.formularioProduto.invalid) {

      // MOSTRA OS ERROS DOS CAMPOS
      this.formularioProduto.markAllAsTouched();

      return;
    }

    // MOSTRA OS DADOS NO CONSOLE
    console.log('Produto:', this.formularioProduto.value);
  }
}