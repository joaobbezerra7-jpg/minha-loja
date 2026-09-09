// Importação dos decorators e tipos fundamentais do Angular
import { Component, OnInit } from '@angular/core';

// Decorator que define o componente do Angular e seus arquivos associados (HTML e CSS)
@Component({
  selector: 'app-produto',                  
  templateUrl: './produto.html',           
  styleUrls: ['./produto.css']
})

export class ProdutoComponent implements OnInit {
  
  // Propriedade que armazenará a mensagem explicativa do status do componente
  mensagemStatus: string = ''

  // Construtor executado ao instanciar a classe
  constructor() {}

  // Hook de ciclo de vida do Angular executado após a inicialização do componente
  ngOnInit(): void {
    // Inicializa uma mensagem de verificação na montagem da tela
    this.mensagemStatus = 'Componente de produtos carregado com sucesso!';
    
    // Dispara a rotina de inicialização de dados do componente
    this.carregarDadosIniciais();
  }

  // Método responsável por preparar e carregar dados do módulo de produtos
  carregarDadosIniciais(): void {
    // Imprime um log no console do navegador para acompanhamento do fluxo de execução
    console.log('[ProdutoComponent] Inicializando carregamento dos componentes de hardware...');
  }
}


