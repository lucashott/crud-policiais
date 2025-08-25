// src/app/components/policial-form/policial-form.component.ts

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

// Importe seu serviço (supondo que ele já exista)
import { PolicialService } from '../../services/policial.service'; 
// Importe o validador customizado de CPF (criaremos a seguir)
import { CpfValidator } from '../../validators/cpf.validator';

@Component({
  selector: 'app-policial-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule
  ],
  templateUrl: './policial-form.component.html',
  styleUrls: ['./policial-form.component.css']
})
// src/app/components/policial-form/policial-form.component.ts
// (continuação do arquivo do Passo 1)

export class PolicialFormComponent {
  policialForm: FormGroup;

  // Injeção de dependências moderna
  private fb = inject(FormBuilder);
  private policialService = inject(PolicialService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  constructor() {
    this.policialForm = this.fb.group({
      // Campos do formulário com suas validações
      rg_civil: ['', [Validators.required, Validators.maxLength(20)]],
      rg_militar: ['', [Validators.required, Validators.maxLength(20)]],
      cpf: ['', [Validators.required, CpfValidator.cpfValido()]],
      data_nascimento: ['', [Validators.required]],
      matricula: ['', [Validators.required, Validators.maxLength(50)]]
    });
  }

  onSubmit(): void {
    // Marca todos os campos como "tocados" para exibir os erros
    this.policialForm.markAllAsTouched();

    if (this.policialForm.invalid) {
      this.snackBar.open('Por favor, corrija os erros no formulário.', 'Fechar', { duration: 3000 });
      return;
    }

    // Chama o serviço para cadastrar
    this.policialService.cadastrarPolicial(this.policialForm.value).subscribe({
      next: (response) => {
        this.snackBar.open('Policial cadastrado com sucesso!', 'Fechar', { 
          duration: 3000,
          panelClass: ['snackbar-success'] // Classe para estilizar o sucesso
        });
        // Navega para a lista de policiais após o sucesso
        this.router.navigate(['/policiais']); 
      },
      error: (err) => {
        console.error('Erro ao cadastrar policial:', err);
        this.snackBar.open(err.error.message || 'Erro ao cadastrar. Tente novamente.', 'Fechar', { 
          duration: 5000,
          panelClass: ['snackbar-error'] // Classe para estilizar o erro
        });
      }
    });
  }

  // Método auxiliar para facilitar o acesso aos erros no template
  getErrorMessage(fieldName: string): string {
    const field = this.policialForm.get(fieldName);
    if (field?.hasError('required')) {
      return 'Este campo é obrigatório.';
    }
    if (field?.hasError('cpfInvalido')) {
      return 'O CPF informado não é válido.';
    }
    if (field?.hasError('maxlength')) {
      const requiredLength = field.errors ? field.errors['maxlength'].requiredLength : '';
      return `O campo deve ter no máximo ${requiredLength} caracteres.`;
    }
    return '';
  }
}
