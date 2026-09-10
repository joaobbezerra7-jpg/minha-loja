import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { SetorService, Setor } from '../services/setor.service';

@Component({
  selector: 'app-setor-lista',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './setor-lista.html',
  styleUrls: ['./setor-lista.css']
})
export class SetorListaComponent implements OnInit, OnDestroy {
  setores: Setor[] = [];
  carregando: boolean = true;
  mensagemErro: string | null = null;
  private inscricaoSetores!: Subscription;

  constructor(private setorService: SetorService) {}

  ngOnInit(): void {
    // Inscreve no fluxo reativo (atualiza a tela em tempo real)
    this.inscricaoSetores = this.setorService.setores$.subscribe({
      next: (dados) => {
        this.setores = dados;
        this.carregando = false;
      }
    });

    // Busca inicial no backend
    this.setorService.carregarSetores().subscribe({
      error: (err) => {
        this.mensagemErro = 'Não foi possível carregar os setores.';
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
}
