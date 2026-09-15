
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface PedidoProduto {

  idpedido: number;

  idproduto: number;

  quantidade: number;

  valor_unitario: number | string;

}


@Injectable({
  providedIn: 'root'
})


export class PedidoProdutoService {

  private urlApi =
    'http://127.0.0.1:8000/pedidos/';


  constructor(
    private http: HttpClient
  ) {}


  adicionarProduto(
    idpedido: number,
    produto: PedidoProduto
  ): Observable<PedidoProduto> {

    return this.http.post<PedidoProduto>(

      `${this.urlApi}${idpedido}/produtos`,

      produto

    );

  }


  listarProdutos(
    idpedido: number
  ): Observable<PedidoProduto[]> {

    return this.http.get<PedidoProduto[]>(

      `${this.urlApi}${idpedido}/produtos`

    );

  }


  removerProduto(
    idpedido: number,
    idproduto: number
  ): Observable<void> {

    return this.http.delete<void>(

      `${this.urlApi}${idpedido}/produtos/${idproduto}`

    );

  }

}

