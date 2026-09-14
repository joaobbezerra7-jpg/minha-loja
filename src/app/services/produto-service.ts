import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Produto {
  idproduto?: number;
  idsetor: number;
  produto: string;
  descricao_produto?: string;
  valor_unitario: number;
  unidade: string;
  estoque: number;
  foto?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private urlApi = 'http://127.0.0.1:8000/produtos/';

  constructor(private http: HttpClient) {}

  salvarProduto(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(
      this.urlApi,
      produto
    );
  }

  listarProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(
      this.urlApi
    );
  }

  buscarProduto(idproduto: number): Observable<Produto> {
    return this.http.get<Produto>(
      `${this.urlApi}${idproduto}`
    );
  }

  alterarProduto(
    idproduto: number,
    produto: Partial<Produto>
  ): Observable<Produto> {
    return this.http.put<Produto>(
      `${this.urlApi}${idproduto}`,
      produto
    );
  }

  excluirProduto(idproduto: number): Observable<void> {
    return this.http.delete<void>(
      `${this.urlApi}${idproduto}`
    );
  }
}