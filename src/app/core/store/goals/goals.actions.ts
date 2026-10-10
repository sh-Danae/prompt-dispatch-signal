import { createActionGroup, props } from '@ngrx/store';

export const GoalsActions = createActionGroup({
  source: 'Goals API/Wizard',
  events: {
    // Guarda el prompt actual en el historial de los últimos 3
    'Save Recent Goal': props<{ text: string }>(),

    // Controlar el estado general de la meta
    'Set Active Goal': props<{ goalId: string; prompt: string }>(),
  },
});
