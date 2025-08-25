// src/app/components/policial-list/policial-list.component.ts

// --- Bloco de Importações ---
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

// Importações do Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

// Importações do nosso próprio código (Serviço e Interface)
import { Policial, PolicialService } from '../../services/policial.service';

// --- Decorator do Componente ---
@Component({
  selector: 'app-policial-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink, // Necessário para o botão "Novo Cadastro" funcionar
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  templateUrl: './policial-list.component.html',
  styleUrls: ['./policial-list.component.css']
})

// --- Classe do Componente (versão única e corrigida) ---
export class PolicialListComponent implements OnInit {
  // Declara um Observable que vai conter o array de policiais.
  // O '$' no final do nome é uma convenção para indicar que a variável é um Observable.
  policiais$!: Observable<Policial[]>;

  // Injeta o PolicialService para podermos usá-lo.
  private policialService = inject(PolicialService);

  // O construtor pode ficar vazio, pois a injeção é feita via inject().
  constructor() { }

  // O método ngOnInit é um "gancho de ciclo de vida" do Angular.
  // Ele é executado uma vez, quando o componente é inicializado.
  ngOnInit(): void {
    // Aqui, chamamos o método do serviço para buscar a lista de policiais.
    // O resultado (um Observable) é atribuído à nossa variável.
    // Não usamos .subscribe() aqui, pois o pipe 'async' no template HTML cuidará disso.
    this.policiais$ = this.policialService.listarPoliciais();
  }
}
