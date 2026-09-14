import { Injectable } from '@angular/core';
import { Cliente } from '../models/Clientes';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) {}

  listarClientes(): Observable<Cliente[]> {
    const UrlApi = 'http://127.0.0.1:8000/pessoas/';
    return this.http.get<Cliente[]>(UrlApi);
  }

  listarCliente(id: number): Observable<Cliente> {
    const UrlApi = `http://127.0.0.1:8000/pessoas/${id}`;
    return this.http.get<Cliente>(UrlApi);
  }

  salvarCliente(cliente: Cliente): Observable<Cliente> {
    const UrlApi = 'http://127.0.0.1:8000/pessoas/';
    return this.http.post<Cliente>(UrlApi, cliente);
  }

  excluirCliente(id: number): Observable<Cliente> {
    const UrlApi = `http://127.0.0.1:8000/pessoas/${id}`;
    return this.http.delete<Cliente>(UrlApi);
  }

  alterarCliente(cliente: Cliente): Observable<Cliente> {
    const UrlApi = `http://127.0.0.1:8000/pessoas/${cliente.idpessoa}`;
    return this.http.put<Cliente>(UrlApi, cliente);
  }
}