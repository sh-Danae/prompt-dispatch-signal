import { Component, signal, inject, computed, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TasksActions } from '../../core/store/tasks/tasks.actions';
import { GoalsActions } from '../../core/store/goals/goals.actions';
import { selectRecentGoals } from '../../core/store/goals/goals.selectors';
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
  private store = inject(Store);

  sidebarCollapsed = signal<boolean>(false);
  promptText = signal<string>('');
  isGenerating = signal<boolean>(false);
  loadingMessage = signal<string>('Analizando objetivo principal...');
  hederValue = signal<string>('Prompts');

  charCount = computed(() => this.promptText().length);
  isPromptValid = computed(() => this.promptText().trim().length >= 10);

  // Leemos los últimos 3 prompts directamente desde el Store de NgRx como una Signal
  recentGoalsSignal: Signal<string[]> =
    this.store.selectSignal(selectRecentGoals);

  // Mapeamos dinámicamente las sugerencias para construir las etiquetas (Top 1, Top 2, Top 3)
  currentSuggestions = computed(() => {
    const icons = ['🚀 Reciente 1', '📦 Reciente 2', '🛡️ Reciente 3'];
    return this.recentGoalsSignal().map((text, index) => ({
      label: icons[index] || '💬 Reciente',
      text: text,
    }));
  });

  inputPlaceholder = computed(
    () => 'Ej: Introduce tu próximo gran objetivo para desglosarlo con IA...',
  );
  onHeaderTabChange(newValue: string) {
    this.hederValue.set(newValue);

    // Opcional: Si deseas limpiar el cuadro de texto al cambiar de pestaña estilo Gemini
    this.promptText.set('');
  }
  selectSuggestion(text: string) {
    this.promptText.set(text);
  }

  onSidebarToggle(collapsed: boolean) {
    this.sidebarCollapsed.set(collapsed);
  }

  generateOrchestration() {
    if (!this.isPromptValid()) return;

    const currentPrompt = this.promptText();
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
        this.finalizeOrchestration(currentPrompt);
      }
    }, 1500);
  }

  private finalizeOrchestration(promptToSave: string) {
    // 1. Guardamos el prompt enviado en el historial inmutable
    this.store.dispatch(GoalsActions.saveRecentGoal({ text: promptToSave }));

    // 2. Disparamos el motor asíncrono para recalcular el árbol de tareas
    this.store.dispatch(TasksActions.recalculateDependencies());

    // 💡 REMOVIDO: Quitamos el router.navigate de aquí.
    // Ahora el Effect 'navigateToDashboard$' se encarga de cambiar la pantalla de forma ordenada.
  }
}
