import { Routes } from '@angular/router';
import { PromptWizardComponent } from './features/prompt-wizard/prompt-wizard.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

export const routes: Routes = [
  // Ruta por defecto: Abre el asistente de IA primero
  { path: '', component: PromptWizardComponent },

  // Ruta del panel: Se navega automáticamente tras terminar la animación de la IA
  { path: 'dashboard', component: DashboardComponent },

  // Comodín para redirigir cualquier error de ruta al inicio
  { path: '**', redirectTo: '' },
];
