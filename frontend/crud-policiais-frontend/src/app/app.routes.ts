import { Routes } from '@angular/router';
import { PolicialListComponent } from './components/policial-list/policial-list.component';
import { PolicialFormComponent } from './components/policial-form/policial-form.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/policiais',
    pathMatch: 'full'
  },
  {
    path: 'policiais',
    component: PolicialListComponent
  },

  {
    path: 'policiais/editar/:id',
    component: PolicialFormComponent
  },
  // 2. ROTA DE CADASTRO (EXISTENTE)
  // Mantida como está.
  {
    path: 'policiais/novo',
    component: PolicialFormComponent
  },
];
