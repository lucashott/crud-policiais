// src/app/components/policial-list/policial-list.component.ts

// --- Bloco de Importações ---
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
// 1. Importações do RxJS e de Formulários Reativos
import { Observable, switchMap, debounceTime, distinctUntilChanged, startWith } from 'rxjs';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

// Importações do Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field'; // Para o campo de busca
import { MatInputModule } from '@angular/material/input';       // Para o campo de busca

// Importações do nosso próprio código (Serviço e Interface)
import { Policial, PolicialService } from '../../services/policial.service';

// --- Decorator do Componente ---
@Component({
  selector: 'app-policial-list',
  standalone: true,
  // 2. Adicione os módulos necessários para o formulário de busca
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule, // Módulo para formulários reativos
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatFormFieldModule, // Módulo do campo de formulário do Material
    MatInputModule      // Módulo do input do Material
  ],
  templateUrl: './policial-list.component.html',
  styleUrls: ['./policial-list.component.css']
})

// --- Classe do Componente (com lógica de busca) ---
export class PolicialListComponent implements OnInit {
  // Observable que conterá a lista de policiais (filtrada ou não).
  policiais$!: Observable<Policial[]>;

  // 3. Controle de formulário para o campo de busca.
  searchControl = new FormControl('');

  // Injeção de dependências.
  private policialService = inject(PolicialService);

  constructor() { }

  ngOnInit(): void {
    // 4. Lógica reativa para a busca.
    // Atribuímos ao policiais$ um pipeline de operadores RxJS que reage
    // às mudanças no valor do campo de busca.
    this.policiais$ = this.searchControl.valueChanges.pipe(
      // startWith(''): Emite um valor inicial (string vazia) assim que a inscrição ocorre.
      // Isso garante que a lista completa seja carregada na primeira vez que o componente é renderizado.
      startWith(''),

      // debounceTime(300): Espera por 300 milissegundos de inatividade do usuário antes de emitir o valor.
      // Isso evita fazer uma requisição a cada tecla digitada.
      debounceTime(300),

      // distinctUntilChanged(): Só emite o valor se ele for diferente do valor anterior.
      // Evita requisições duplicadas se o usuário apagar e reescrever o mesmo termo.
      distinctUntilChanged(),

      // switchMap(...): O operador mais importante aqui.
      // Ele pega o termo de busca mais recente, cancela qualquer requisição HTTP anterior
      // que ainda esteja em andamento e faz uma nova chamada para `listarPoliciais` com o novo termo.
      // Isso garante que apenas a resposta da última busca seja considerada.
      switchMap(termo => this.policialService.listarPoliciais(termo || ''))
    );
  }
}
