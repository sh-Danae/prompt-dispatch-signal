import { createReducer, on } from '@ngrx/store';
import { Task } from '../../models/task.model';
import { TasksActions } from './tasks.actions';

export interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

export const initialTasksState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
};

export const tasksReducer = createReducer(
  initialTasksState,

  on(TasksActions.loadTasks, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(TasksActions.loadTasksSuccess, (state, { tasks }) => ({
    ...state,
    loading: false,
    tasks,
  })),

  on(TasksActions.loadTasksFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Actualiza una sola tarea (cuando el usuario la arrastra)
  on(TasksActions.updateTaskStatus, (state, { taskId, newStatus }) => ({
    ...state,
    tasks: state.tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task,
    ),
  })),

  // Actualiza múltiples tareas a la vez (cuando el Effect desbloquea o bloquea nodos hijos)
  on(TasksActions.updateMultipleTasksStatus, (state, { updates }) => ({
    ...state,
    tasks: state.tasks.map((task) => {
      const update = updates.find((u) => u.id === task.id);
      return update ? { ...task, status: update.status } : task;
    }),
  })),
);
