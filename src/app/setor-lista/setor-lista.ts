import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { SetorService } from '../services/setor.service';
import { Setor } from '../models/setor';

@Component({
  selector: 'app-setor-lista',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './setor-lista.html',
  styleUrls: ['./setor-lista.css']
})
export class SetorListaComponent implements OnInit, OnDestroy {
  setores: Setor[] = [];
  carregando: boolean = false;
  mensagemErro: string | null = null;
  private inscricaoSetores!: Subscription;

  constructor(private setorService: SetorService) {}

  ngOnInit(): void {
    this.carregando = true;
    this.inscricaoSetores = this.setorService.setores$.subscribe({
      next: (dados: Setor[]) => {
        this.setores = dados;
        this.carregando = false;
      },
      error: (err: any) => {
        this.mensagemErro = 'Erro ao carregar a lista de setores.';
        this.carregando = false;
        console.error(err);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.inscricaoSetores) {
      this.inscricaoSetores.unsubscribe();
    }
  }

  excluirSetor(idsetor?: number): void {
    if (idsetor && confirm('Tem certeza que deseja excluir esta categoria?')) {
      this.setorService.excluirSetor(idsetor);
    }
  }
}