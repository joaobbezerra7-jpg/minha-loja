import { Injectable } from '@angular/core';
//import { Cliente } from '../modelos/Clientes';
//import { HttpClient } from '@angular/common/http';
//import { Observable } from 'rxjs';


Injectable({
    providedIn: 'root',
  })
export class ClienteService {
  
   // constructor(private http: HttpClient) {}
}
    /*listarCorridas(): Observable<Corridas[]> {
            const UrlApi = 'http://127.0.0.1:8000/corrida/'
   
        return this.http.get<Corridas[]>(UrlApi);
      }
    
      listarCorrida(id: number): Observable<Corridas> {
        const UrlApi = `http://127.0.0.1:8000/corrida/${id}`
       
        return this.http.get<Corridas>(UrlApi);
      }
    
      salvarCorrida(corrida: Corridas): Observable<Corridas> {
        const UrlApi = `http://127.0.0.1:8000/corrida/`
        
        return this.http.post<Corridas>(UrlApi, corrida);
      }
    
      excluirCorrida(id: number): Observable<Corridas> {
        const UrlApi = `http://127.0.0.1:8000/corrida/${id}`
        
        return this.http.delete<Corridas>(UrlApi);
      }
    
      alterarCorrida(corrida: Corridas): Observable<Corridas> {
        const UrlApi = `http://127.0.0.1:8000/corrida/${corrida.idcorrida}`
        
        return this.http.put<Corridas>(UrlApi, corrida);
      }
    }
}*/
