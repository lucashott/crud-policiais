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
    // Rota de Cadastro: Quando a URL for http://.../policiais/novo.
    path: 'policiais/novo',
    component: PolicialFormComponent
  },
];
