// src/app/services/policial.service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Interface para tipar os dados do policial.
 * Ajuda a evitar erros e melhora a autocompletação do código.
 */
export interface Policial {
  id?: number; // O ID é opcional, pois um policial novo ainda não tem ID.
  rg_civil: string;
  rg_militar: string;
  cpf: string;
  data_nascimento: string; // O backend espera uma string no formato YYYY-MM-DD
  matricula: string;
}

@Injectable({
  providedIn: 'root'
} )
export class PolicialService {
  // URL base da sua API.
  // Certifique-se de que a porta (ex: 3000) é a mesma do seu backend.
  private readonly apiUrl = 'http://localhost:3000/api/policiais';

  // Injeta o HttpClient para fazer requisições HTTP.
  private http = inject(HttpClient );

  constructor() { }

  /**
   * Envia os dados de um novo policial para o backend.
   * @param dados Os dados do policial a serem cadastrados, seguindo a interface Policial.
   * @returns Um Observable com o policial que foi criado no banco (incluindo o ID).
   */
  cadastrarPolicial(dados: Policial): Observable<Policial> {
    // Faz uma requisição HTTP POST para a URL da API, enviando os dados.
    // O <Policial> indica que esperamos receber um objeto do tipo Policial na resposta.
    return this.http.post<Policial>(this.apiUrl, dados );
  }

  /**
   * Busca a lista de todos os policiais cadastrados no backend.
   * @returns Um Observable com um array de policiais.
   */
  listarPoliciais(): Observable<Policial[]> {
    // Faz uma requisição HTTP GET para a URL da API.
    // O <Policial[]> indica que esperamos receber um array de objetos do tipo Policial.
    return this.http.get<Policial[]>(this.apiUrl );
  }
}
