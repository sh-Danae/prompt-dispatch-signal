import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, withLatestFrom, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { TasksActions } from './tasks.actions';
import { Task, TaskStatus } from '../../models/task.model';

@Injectable({ providedIn: 'root' })
export class TasksEffects {
  private actions$ = inject(Actions);
  private store = inject(Store<{ tasksFeature: { tasks: Task[] } }>);

  // Selector inline para simplificar el ejemplo
  private selectAllTasks = (state: { tasksFeature: { tasks: Task[] } }) =>
    state.tasksFeature.tasks;

  evaluateDependencies$ = createEffect(() =>
    this.actions$.pipe(
      // Escuchamos tanto la actualización manual como los recalculos
      ofType(
        TasksActions.updateTaskStatus,
        TasksActions.recalculateDependencies,
      ),
      withLatestFrom(this.store.select(this.selectAllTasks)),
      concatMap(([action, allTasks]) => {
        const updates: { id: string; status: TaskStatus }[] = [];

        allTasks.forEach((task) => {
          // No evaluamos tareas ya completadas o en progreso activo de manera autónoma
          if (task.status === 'COMPLETED' || task.status === 'IN_PROGRESS')
            return;

          const dependencies = task.dependsOn;
          if (dependencies.length === 0) {
            if (task.status === 'BLOCKED')
              updates.push({ id: task.id, status: 'PENDING' });
            return;
          }

          // Verificar si TODAS las dependencias de esta tarea están completadas
          const allDepsCompleted = dependencies.every((depId) => {
            const depTask = allTasks.find((t) => t.id === depId);
            return depTask?.status === 'COMPLETED';
          });

          if (allDepsCompleted && task.status === 'BLOCKED') {
            updates.push({ id: task.id, status: 'PENDING' });
          } else if (!allDepsCompleted && task.status === 'PENDING') {
            updates.push({ id: task.id, status: 'BLOCKED' });
          }
        });

        if (updates.length > 0) {
          return of(TasksActions.updateMultipleTasksStatus({ updates }));
        }

        return of({ type: '[Tasks Engine] No Updates Needed' });
      }),
    ),
  );
}
