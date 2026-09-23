import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { Task, TaskStatus } from '../../models/task.model';

export const TasksActions = createActionGroup({
  source: 'Tasks API/Dashboard',
  events: {
    // Cargar tareas iniciales desglosadas por la IA
    'Load Tasks': props<{ goalId: string }>(),
    'Load Tasks Success': props<{ tasks: Task[] }>(),
    'Load Tasks Failure': props<{ error: string }>(),

    // Modificación manual (Drag & Drop)
    'Update Task Status': props<{ taskId: string; newStatus: TaskStatus }>(),

    // Automatización del Motor de Dependencias (Disparado por Effects)
    'Recalculate Dependencies': emptyProps(),
    'Update Multiple Tasks Status': props<{
      updates: { id: string; status: TaskStatus }[];
    }>(),
  },
});
