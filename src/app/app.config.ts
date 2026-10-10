import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { TasksEffects } from './core/store/tasks/tasks.effects';
import { tasksReducer } from './core/store/tasks/tasks.reducer';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { goalsReducer } from './core/store/goals/goals.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({ tasksFeature: tasksReducer, goalsFeature: goalsReducer }),
    provideEffects([TasksEffects]),
  ],
};
