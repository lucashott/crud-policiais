// src/app/app.routes.ts

import { Routes } from '@angular/router';

// 1. Importe os componentes que serão usados nas rotas.
import { PolicialListComponent } from './components/policial-list/policial-list.component';
import { PolicialFormComponent } from './components/policial-form/policial-form.component';

// 2. Defina o array de rotas da sua aplicação.
export const routes: Routes = [
  {
    // Rota Raiz: Redireciona o caminho vazio ('') para '/policiais'.
    // 'pathMatch: 'full'' garante que apenas o caminho exatamente vazio será redirecionado.
    path: '',
    redirectTo: '/policiais',
    pathMatch: 'full'
  },
  {
    // Rota de Listagem: Quando a URL for http://.../policiais,
    // o Angular vai carregar e exibir o PolicialListComponent.
    path: 'policiais',
    component: PolicialListComponent
  },
  {
    // Rota de Cadastro: Quando a URL for http://.../policiais/novo,
    // o Angular vai carregar e exibir o PolicialFormComponent.
    // É importante que esta rota venha DEPOIS da rota '/policiais' se tivéssemos
    // rotas com parâmetros como '/policiais/:id', para evitar conflitos.
    path: 'policiais/novo',
    component: PolicialFormComponent
  },
  // (Opcional, mas recomendado ) Rota de Edição:
  // No futuro, você pode adicionar uma rota para edição.
  // {
  //   path: 'policiais/editar/:id', // O ':id' é um parâmetro dinâmico.
  //   component: PolicialFormComponent
  // }
];
