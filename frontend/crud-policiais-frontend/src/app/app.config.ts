import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

// Importa a definição das suas rotas do arquivo app.routes.ts
import { routes } from './app.routes';

// 2. Configuração da Aplicação: O objeto principal que define os providers.
export const appConfig: ApplicationConfig = {
  providers: [
    // Configura o sistema de rotas da aplicação.
    provideRouter(routes ),

    // Habilita o sistema de animações do Angular, necessário para o Angular Material.
    provideAnimations(),

    // Habilita o HttpClient, permitindo que seus serviços façam requisições HTTP (API).
    provideHttpClient()
  ]
};
