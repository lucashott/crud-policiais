import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { filter, switchMap } from 'rxjs';

import { PolicialService } from '../../services/policial.service';
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
export class PolicialFormComponent implements OnInit {
  policialForm: FormGroup;

  // Injeção de dependências com `inject`
  private fb = inject(FormBuilder);
  private policialService = inject(PolicialService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  policialId: number | null = null; // usado para saber se é edição

  constructor() {
    this.policialForm = this.fb.group({
      rg_civil: ['', [Validators.required, Validators.maxLength(20)]],
      rg_militar: ['', [Validators.required, Validators.maxLength(20)]],
      cpf: ['', [Validators.required, CpfValidator.cpfValido()]],
      data_nascimento: ['', [Validators.required]],
      matricula: ['', [Validators.required, Validators.maxLength(50)]]
    });
  }

  ngOnInit(): void {
    // Verifica se a rota tem `id` e carrega os dados se for edição
    this.route.paramMap.pipe(
      filter(params => params.has('id')),
      switchMap(params => this.policialService.buscarPolicialPorId(Number(params.get('id'))))
    ).subscribe(policial => {
      if (policial) {
        this.policialId = policial.id!;
        this.policialForm.patchValue(policial);
      }
    });
  }

  onSubmit(): void {
    this.policialForm.markAllAsTouched();

    if (this.policialForm.invalid) {
      this.snackBar.open('Por favor, corrija os erros no formulário.', 'Fechar', { duration: 3000 });
      return;
    }

    if (this.policialId) {
      // --- MODO EDIÇÃO ---
      this.policialService.editarPolicial(this.policialId, this.policialForm.value).subscribe({
        next: () => {
          this.snackBar.open('Policial atualizado com sucesso!', 'Fechar', { duration: 3000 });
          this.router.navigate(['/policiais']);
        },
        error: () => this.snackBar.open('Erro ao atualizar.', 'Fechar', { duration: 3000 })
      });
    } else {
      // --- MODO CADASTRO ---
      this.policialService.cadastrarPolicial(this.policialForm.value).subscribe({
        next: () => {
          this.snackBar.open('Policial cadastrado com sucesso!', 'Fechar', { duration: 3000 });
          this.router.navigate(['/policiais']);
        },
        error: () => this.snackBar.open('Erro ao cadastrar.', 'Fechar', { duration: 3000 })
      });
    }
  }

  // Método auxiliar para erros nos campos
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
