import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Setor } from '../models/setor';

@Injectable({
  providedIn: 'root'
})
export class SetorService {
  private setores: Setor[] = [
    { idsetor: 1, nome: 'Hardware' },
    { idsetor: 2, nome: 'Periféricos' },
    { idsetor: 3, nome: 'Armazenamento' }
  ];
  private proximoId: number = 4;
  private setoresSubject = new BehaviorSubject<Setor[]>(this.setores);

  setores$: Observable<Setor[]> = this.setoresSubject.asObservable();

  // Consultar / Listar
  getSetores(): Setor[] {
    return this.setores;
  }

  // Cadastrar
  adicionarSetor(nome: string): Setor {
    const novoSetor: Setor = {
      idsetor: this.proximoId++,
      nome: nome.trim()
    };
    this.setores.push(novoSetor);
    this.atualizarLista();
    return novoSetor;
  }

  // Editar
  atualizarSetor(idsetor: number, novoNome: string): void {
    const setor = this.setores.find(s => s.idsetor === idsetor);
    if (setor) {
      setor.nome = novoNome.trim();
      this.atualizarLista();
    }
  }

  // Excluir
  excluirSetor(idsetor: number): void {
    this.setores = this.setores.filter(s => s.idsetor !== idsetor);
    this.atualizarLista();
  }

  private atualizarLista(): void {
    this.setoresSubject.next([...this.setores]);
  }
}