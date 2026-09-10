import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

export interface Produto {
  id: number;
  brand: string;
  title: string;
  currentPrice: number;
  installmentPrice: number;
  installmentCount: number;
  tag: string;
  paymentMethodInfo?: string;
}

@Component({
  selector: 'app-loja',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './loja.component.html',
  styleUrls: ['./loja.component.css']
})
export class LojaComponent implements OnInit {
  termoBusca: string = '';
  quantidadeCarrinho: number = 0;

  produtos: Produto[] = [
    {
      id: 1,
      brand: 'NVIDIA',
      title: 'Placa de Vídeo RTX 4070 12GB GDDR6X 192-bit',
      currentPrice: 1899.00,
      installmentPrice: 1990.90,
      installmentCount: 10,
      tag: 'GPU'
    },
    {
      id: 2,
      brand: 'INTEL',
      title: 'Processador Intel Core i7-13700K, 16-Cores, 24-Threads',
      currentPrice: 2650.90,
      installmentPrice: 2899.99,
      installmentCount: 10,
      tag: 'CPU'
    },
    {
      id: 3,
      brand: 'KINGSTON',
      title: 'Memória RAM Kingston Fury Beast 16GB DDR5 6000MHz',
      currentPrice: 1450.50,
      installmentPrice: 1600.90,
      installmentCount: 10,
      tag: 'RAM'
    },
    {
      id: 4,
      brand: 'XPG',
      title: 'SSD 1TB XPG S70 Blade, M.2 NVMe, Leitura 7400MB/s',
      currentPrice: 999.90,
      installmentPrice: 1120.95,
      installmentCount: 10,
      tag: 'SSD'
    },
    {
      id: 5,
      brand: 'ASUS',
      title: 'Placa-mãe ASUS TUF Gaming B760M-PLUS, DDR5, LGA 1700',
      currentPrice: 1229.90,
      installmentPrice: 1349.90,
      installmentCount: 10,
      tag: 'MOBO'
    },
    {
      id: 6,
      brand: 'CORSAIR',
      title: 'Fonte Corsair CX750, 750W, 80 Plus Bronze, PFC Ativo',
      currentPrice: 619.90,
      installmentPrice: 679.90,
      installmentCount: 10,
      tag: 'PSU'
    },
    {
      id: 7,
      brand: 'DEEPCOOL',
      title: 'Water Cooler DeepCool LE520, 240mm, ARGB, Intel e AMD',
      currentPrice: 449.90,
      installmentPrice: 499.90,
      installmentCount: 10,
      tag: 'COOLER'
    },
    {
      id: 8,
      brand: 'REDRAGON',
      title: 'Gabinete Redragon Wideload Pro, Mid Tower, Lateral em Vidro',
      currentPrice: 349.90,
      installmentPrice: 389.90,
      installmentCount: 10,
      tag: 'CASE',
      paymentMethodInfo: 'À vista no PIX com 30% de desconto'
    }
  ];

  produtosExibidos: Produto[] = [];

  ngOnInit(): void {
    this.produtosExibidos = [...this.produtos];
  }

  executarBusca(): void {
    const termo = this.termoBusca.trim().toLowerCase();

    if (!termo) {
      this.produtosExibidos = [...this.produtos];
      return;
    }

    this.produtosExibidos = this.produtos.filter(produto =>
      produto.title.toLowerCase().includes(termo) ||
      produto.brand.toLowerCase().includes(termo) ||
      produto.tag.toLowerCase().includes(termo)
    );
  }

  adicionarAoCarrinho(produto: Produto): void {
    this.quantidadeCarrinho += 1;
  }

  calcularValorParcela(valorTotal: number, parcelas: number): number {
    return valorTotal / parcelas;
  }
}



;;;;;