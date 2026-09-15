
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CarrinhoProduto {
  idcarrinho: number;
  idproduto: number;
  quantidade: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  private urlApi = 'http://127.0.0.1:8000/carrinho/';

  constructor(private http: HttpClient) {}

  adicionarProduto(
    idpessoa: number,
    idproduto: number,
    quantidade: number
  ): Observable<CarrinhoProduto> {
    return this.http.post<CarrinhoProduto>(
      `${this.urlApi}${idpessoa}/produtos`,
      {
        idproduto: idproduto,
        quantidade: quantidade
      }
    );
  }

  listarCarrinho(idpessoa: number): Observable<CarrinhoProduto[]> {
    return this.http.get<CarrinhoProduto[]>(
      `${this.urlApi}${idpessoa}`
    );
  }

  alterarQuantidade(
    idpessoa: number,
    idproduto: number,
    quantidade: number
  ): Observable<CarrinhoProduto> {
    return this.http.put<CarrinhoProduto>(
      `${this.urlApi}${idpessoa}/produtos/${idproduto}`,
      {
        quantidade: quantidade
      }
    );
  }

  removerProduto(
    idpessoa: number,
    idproduto: number
  ): Observable<any> {
    return this.http.delete(
      `${this.urlApi}${idpessoa}/produtos/${idproduto}`
    );
  }

  calcularTotal(idpessoa: number): Observable<number> {
    return this.http.get<number>(
      `${this.urlApi}${idpessoa}/total`
    );
  }

  finalizarCarrinho(idpessoa: number): Observable<any> {
    return this.http.put(
      `${this.urlApi}${idpessoa}/finalizar`,
      {}
    );
  }
}

