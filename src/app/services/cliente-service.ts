import { Injectable } from '@angular/core';
import { Cliente } from '../modelos/Clientes';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


Injectable({
    providedIn: 'root',
  })
export class ClienteService {
  
    constructor(private http: HttpClient) {}

     listarClientes(): Observable<Cliente[]> {
            const UrlApi =  'http://127.0.0.1:8000/pessoa/'
   
        return this.http.get<Cliente[]>(UrlApi);
      }
    
      listarCliente(id: number): Observable<Cliente> {
        const UrlApi =   `http://127.0.0.1:8000/pessoa/${id}`
       
        return this.http.get<Cliente>(UrlApi);
      }
    
      salvarCliente(Cliente: Cliente): Observable<Cliente> {
        const UrlApi = 'http://127.0.0.1:8000/pessoa/'
        
        return this.http.post<Cliente>(UrlApi, Cliente);
      }
    
      excluirCliente(id: number): Observable<Cliente> {
        const UrlApi = `http://127.0.0.1:8000/pessoa/${id}`
        
        return this.http.delete<Cliente>(UrlApi);
      }
    
      alterarCliente(Cliente: Cliente): Observable<Cliente> {
        const UrlApi = `http://127.0.0.1:8000/pessoa/${Cliente.idpessoa}`
        
        return this.http.put<Cliente>(UrlApi, Cliente);
      }
    }

