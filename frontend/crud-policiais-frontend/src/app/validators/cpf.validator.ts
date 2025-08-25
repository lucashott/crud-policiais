import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CpfValidator {
  static cpfValido(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const cpf = control.value;
      if (!cpf) {
        return null; // Deixa a validação de campo obrigatório para o Validators.required
      }

      // Remove caracteres não numéricos
      const cpfNumerico = cpf.replace(/\D/g, '');

      // Verifica se tem 11 dígitos ou se todos os dígitos são iguais
      if (cpfNumerico.length !== 11 || /^(\d)\1{10}$/.test(cpfNumerico)) {
        return { cpfInvalido: true };
      }

      // Lógica completa de validação de CPF (cálculo dos dígitos verificadores)
      let soma = 0;
      let resto;
      for (let i = 1; i <= 9; i++) {
        soma = soma + parseInt(cpfNumerico.substring(i - 1, i)) * (11 - i);
      }
      resto = (soma * 10) % 11;

      if ((resto === 10) || (resto === 11)) {
        resto = 0;
      }
      if (resto !== parseInt(cpfNumerico.substring(9, 10))) {
        return { cpfInvalido: true };
      }

      soma = 0;
      for (let i = 1; i <= 10; i++) {
        soma = soma + parseInt(cpfNumerico.substring(i - 1, i)) * (12 - i);
      }
      resto = (soma * 10) % 11;

      if ((resto === 10) || (resto === 11)) {
        resto = 0;
      }
      if (resto !== parseInt(cpfNumerico.substring(10, 11))) {
        return { cpfInvalido: true };
      }

      return null; // CPF válido
    };
  }
}
