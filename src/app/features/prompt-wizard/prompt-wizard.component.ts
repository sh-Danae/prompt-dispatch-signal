import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TasksActions } from '../../core/store/tasks/tasks.actions';

@Component({
  selector: 'app-prompt-wizard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './prompt-wizard.component.html',
  styleUrls: ['./prompt-wizard.component.sass'],
})
export class PromptWizardComponent {
  private router = inject(Router);
  private store = inject(Store);

  // Signals para controlar el estado local de la UI de forma ultra-rápida
  promptText = signal<string>('');
  isGenerating = signal<boolean>(false);
  loadingMessage = signal<string>('Analizando objetivo principal...');

  // Mensajes dinámicos que simulan las fases de pensamiento de Claude
  private loadingPhases = [
    'Analizando objetivo principal...',
    'Estructurando árbol de dependencias...',
    'Asignando agentes especializados...',
    'Generando tablero de control...',
  ];

  generateOrchestration() {
    if (!this.promptText().trim()) return;

    this.isGenerating.set(true);
    let phaseIndex = 0;

    // Simulación interactiva del procesamiento de la IA
    const interval = setInterval(() => {
      phaseIndex++;
      if (phaseIndex < this.loadingPhases.length) {
        this.loadingMessage.set(this.loadingPhases[phaseIndex]);
      } else {
        clearInterval(interval);
        this.finalizeOrchestration();
      }
    }, 1500);
  }

  private finalizeOrchestration() {
    // Aquí despacharemos la acción real a NgRx para que impacte el Store global
    this.store.dispatch(TasksActions.recalculateDependencies());

    // Navegamos fluidamente hacia la vista del Dashboard
    this.router.navigate(['/dashboard']);
  }
}
