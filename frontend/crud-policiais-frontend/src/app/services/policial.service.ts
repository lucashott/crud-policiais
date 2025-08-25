import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Policial {
  id?: number;
  rg_civil: string;
  rg_militar: string;
  cpf: string;
  data_nascimento: string;
  matricula: string;
}

@Injectable({
  providedIn: 'root'
})
export class PolicialService {
  private readonly apiUrl = 'http://localhost:3000/api/policiais';
  private http = inject(HttpClient);

  constructor() {}

  cadastrarPolicial(dados: Policial): Observable<Policial> {
    return this.http.post<Policial>(this.apiUrl, dados);
  }

  listarPoliciais(termoBusca: string = ''): Observable<Policial[]> {
    let params = new HttpParams();
    if (termoBusca.trim()) {
      params = params.set('busca', termoBusca);
    }
    return this.http.get<Policial[]>(this.apiUrl, { params });
  }

  buscarPolicialPorId(id: number): Observable<Policial> {
    return this.http.get<Policial>(`${this.apiUrl}/${id}`);
  }

  editarPolicial(id: number, dados: Policial): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, dados);
  }

  excluirPolicial(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
