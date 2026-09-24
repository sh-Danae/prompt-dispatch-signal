import { Component, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TasksActions } from '../../core/store/tasks/tasks.actions';
import { HeaderComponent } from '../../shared/header/header.component';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-prompt-wizard',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, SidebarComponent],
  templateUrl: './prompt-wizard.component.html',
  styleUrls: ['./prompt-wizard.component.sass'],
})
export class PromptWizardComponent {
  private router = inject(Router);
  private store = inject(Store);

  sidebarCollapsed = signal<boolean>(false);
  promptText = signal<string>('');
  isGenerating = signal<boolean>(false);
  loadingMessage = signal<string>('Analizando objetivo principal...');

  charCount = computed(() => this.promptText().length);
  isPromptValid = computed(() => this.promptText().trim().length >= 10);

  readonly suggestions = [
    {
      label: '🚀 Lanzar App',
      text: 'Quiero lanzar una campaña de marketing digital para mi app móvil de finanzas, incluyendo diseño de copies, configuración de píxeles de conversión y analítica.',
    },
    {
      label: '📦 Rediseño E-commerce',
      text: 'Necesito migrar mi tienda de Shopify a un desarrollo propio en Angular, manteniendo SEO, reestructurando pasarelas de pago y optimizando imágenes.',
    },
    {
      label: '🛡️ Auditoría de Seguridad',
      text: 'Planificar una auditoría de ciberseguridad completa para nuestra infraestructura cloud en AWS, configurando políticas IAM y escaneando vulnerabilidades.',
    },
  ];

  currentSuggestions = computed(() => this.suggestions);
  inputPlaceholder = computed(
    () => 'Ej: Quiero lanzar una campaña de marketing digital...',
  );

  // 💡 SOLUCIÓN: Agregamos el método que le hacía falta a la UI
  selectSuggestion(text: string) {
    this.promptText.set(text);
  }

  onSidebarToggle(collapsed: boolean) {
    this.sidebarCollapsed.set(collapsed);
  }

  generateOrchestration() {
    if (!this.isPromptValid()) return;
    this.isGenerating.set(true);

    let phaseIndex = 0;
    const loadingPhases = [
      'Analizando objetivo principal...',
      'Estructurando árbol de dependencias...',
      'Asignando agentes especializados...',
      'Generando tablero de control...',
    ];

    const interval = setInterval(() => {
      phaseIndex++;
      if (phaseIndex < loadingPhases.length) {
        this.loadingMessage.set(loadingPhases[phaseIndex]);
      } else {
        clearInterval(interval);
        this.finalizeOrchestration();
      }
    }, 1500);
  }

  private finalizeOrchestration() {
    this.store.dispatch(TasksActions.recalculateDependencies());
    this.router.navigate(['/dashboard']);
  }
}
