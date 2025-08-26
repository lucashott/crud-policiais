import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

// Importações do RxJS e de Formulários Reativos
import { Observable, switchMap, debounceTime, distinctUntilChanged, startWith } from 'rxjs';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

// Importações do Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input';       
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

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
    MatInputModule,
    MatSnackBarModule // necessário para usar o MatSnackBar
  ],
  templateUrl: './policial-list.component.html',
  styleUrls: ['./policial-list.component.css']
})

// --- Classe do Componente (com lógica de busca e exclusão) ---
export class PolicialListComponent implements OnInit {
  // Observable que conterá a lista de policiais.
  policiais$!: Observable<Policial[]>;

  // Controle de formulário para o campo de busca.
  searchControl = new FormControl('');

  // Injeções de dependência.
  private policialService = inject(PolicialService);
  private snackBar = inject(MatSnackBar);

  constructor() { }

  ngOnInit(): void {
    // Lógica reativa para a busca.
    this.policiais$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(termo => this.policialService.listarPoliciais(termo || ''))
    );
  }

  excluir(id: number): void {
    // 1. Confirmação com o usuário (boa prática)
    if (confirm('Tem certeza que deseja excluir este policial?')) {
      // 2. Chama o método do serviço
      this.policialService.excluirPolicial(id).subscribe({
        next: () => {
          // 3. Feedback de sucesso
          this.snackBar.open('Policial excluído com sucesso!', 'Fechar', { duration: 3000 });
          
          // 4. ATUALIZA A LISTA NA TELA
          // A forma mais simples é recarregar a lista do zero.
          this.policiais$ = this.policialService.listarPoliciais();
        },
        error: (err) => {
          // 5. Feedback de erro
          console.error('ERRO AO EXCLUIR:', err);
          this.snackBar.open('Erro ao excluir o policial. Tente novamente.', 'Fechar', { duration: 4000 });
        }
      });
    }
  }
}