import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Setor } from '../models/setor.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SetorService {
  private readonly apiUrl = `${environment.apiUrl}/setores`;

  constructor(private http: HttpClient) {}

  criarSetor(setor: Setor): Observable<Setor> {
    return this.http.post<Setor>(`${this.apiUrl}/`, setor);
  }
}