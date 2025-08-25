import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
//Importações do RxJS e de Formulários Reativos
import { Observable, switchMap, debounceTime, distinctUntilChanged, startWith } from 'rxjs';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

// Importações do Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input';       

import { Policial, PolicialService } from '../../services/policial.service';

// --- Decorator do Componente ---
@Component({
  selector: 'app-policial-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatFormFieldModule, 
    MatInputModule      
  ],
  templateUrl: './policial-list.component.html',
  styleUrls: ['./policial-list.component.css']
})

// --- Classe do Componente (com lógica de busca) ---
export class PolicialListComponent implements OnInit {
  // Observable que conterá a lista de policiais.
  policiais$!: Observable<Policial[]>;

  //Controle de formulário para o campo de busca.
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
      startWith(''),

      // debounceTime(300): Espera por 300 milissegundos de inatividade do usuário antes de emitir o valor.
      debounceTime(300),

      // distinctUntilChanged(): Só emite o valor se ele for diferente do valor anterior.
      distinctUntilChanged(),

      // switchMap: Cancela a requisição anterior se uma nova busca for iniciada.
      switchMap(termo => this.policialService.listarPoliciais(termo || ''))
    );
  }
}
