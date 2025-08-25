// src/app/services/policial.service.ts

import { Injectable, inject } from '@angular/core';
// Adicione a importação de HttpParams
import { HttpClient, HttpParams } from '@angular/common/http';
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
  // URL da API do backend.
  private readonly apiUrl = 'http://localhost:3000/api/policiais';

  // Injeta o HttpClient para fazer requisições HTTP.
  private http = inject(HttpClient );

  constructor() { }

  /**
   * Envia os dados de um novo policial para o backend.
   * @param dados Os dados do policial a serem cadastrados.
   * @returns Um Observable com o policial que foi criado.
   */
  cadastrarPolicial(dados: Policial): Observable<Policial> {
    return this.http.post<Policial>(this.apiUrl, dados );
  }

  /**
   * Busca a lista de policiais, opcionalmente filtrando por um termo de busca.
   * @param termoBusca (Opcional) O termo a ser pesquisado (CPF, RG Civil ou RG Militar).
   * @returns Um Observable com um array de policiais.
   */
  listarPoliciais(termoBusca: string = ''): Observable<Policial[]> {
    // Cria um objeto HttpParams para construir a query string da URL.
    let params = new HttpParams();

    // Verifica se um termo de busca foi fornecido e não está vazio.
    if (termoBusca.trim()) {
      // Se houver um termo, adiciona o parâmetro 'busca' à requisição.
      // A URL final será, por exemplo: .../api/policiais?busca=123
      params = params.set('busca', termoBusca);
    }

    // Faz a requisição GET, passando o objeto de parâmetros.
    // O Angular cuidará de montar a URL corretamente.
    return this.http.get<Policial[]>(this.apiUrl, { params } );
  }
}
