import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Setor } from '../models/setor';

@Injectable({
  providedIn: 'root'
})
export class SetorService {
  private readonly apiUrl = 'http://localhost:8080/setores';

  constructor(private http: HttpClient) {}

  criarSetor(setor: Setor): Observable<Setor> {
    return this.http.post<Setor>(`${this.apiUrl}/`, setor);
  }
}