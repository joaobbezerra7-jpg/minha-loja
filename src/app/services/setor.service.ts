import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

export interface Setor {
  idsetor?: number;
  nome: string;
}

@Injectable({
  providedIn: 'root'
})
export class SetorService {
  private readonly apiUrl = 'http://localhost:8000/setores';

  // Estado centralizado dos setores
  private setoresSubject = new BehaviorSubject<Setor[]>([]);
  public setores$ = this.setoresSubject.asObservable();

  constructor(private http: HttpClient) {}

  carregarSetores(): Observable<Setor[]> {
    return this.http.get<Setor[]>(this.apiUrl).pipe(
      tap((dados) => {
        this.setoresSubject.next(dados);
      }),
      catchError((err) => {
        console.warn('Backend offline. Exibindo dados locais do estado reativo.', err);
        return of(this.setoresSubject.getValue());
      })
    );
  }

  cadastrarSetor(setor: Setor): Observable<Setor> {
    return this.http.post<Setor>(this.apiUrl, setor).pipe(
      tap((novoSetor) => {
        const listaAtual = this.setoresSubject.getValue();
        this.setoresSubject.next([...listaAtual, novoSetor]);
      }),
      catchError(() => {
        // Fallback local caso a API esteja temporariamente indisponível
        const novoSetorLocal: Setor = {
          idsetor: this.setoresSubject.getValue().length + 1,
          nome: setor.nome
        };
        const listaAtualizada = [...this.setoresSubject.getValue(), novoSetorLocal];
        this.setoresSubject.next(listaAtualizada);
        return of(novoSetorLocal);
      })
    );
  }
}