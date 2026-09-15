
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pedido {
  idpedido?: number;
  idpessoa: number;
  data_pedido: string;
  status_pedido?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private urlApi =
    'http://127.0.0.1:8000/pedidos/';


  constructor(
    private http: HttpClient
  ) {}


  criarPedido(
    pedido: Pedido
  ): Observable<Pedido> {

    return this.http.post<Pedido>(
      this.urlApi,
      pedido
    );

  }


  listarPedidos(): Observable<Pedido[]> {

    return this.http.get<Pedido[]>(
      this.urlApi
    );

  }


  buscarPedido(
    idpedido: number
  ): Observable<Pedido> {

    return this.http.get<Pedido>(
      `${this.urlApi}${idpedido}`
    );

  }


  alterarPedido(
    idpedido: number,
    pedido: Partial<Pedido>
  ): Observable<Pedido> {

    return this.http.put<Pedido>(
      `${this.urlApi}${idpedido}`,
      pedido
    );

  }


  excluirPedido(
    idpedido: number
  ): Observable<void> {

    return this.http.delete<void>(
      `${this.urlApi}${idpedido}`
    );

  }

}

