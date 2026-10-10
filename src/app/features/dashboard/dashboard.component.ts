import {
  Component,
  inject,
  OnInit,
  computed,
  Signal,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { TaskCardComponent } from './components/task-card/task-card.component';

import { TasksActions } from '../../core/store/tasks/tasks.actions';
import { Task, TaskStatus } from '../../core/models/task.model';
import { HeaderComponent } from '../../shared/header/header.component';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TaskCardComponent, HeaderComponent, SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
})
export class DashboardComponent implements OnInit {
  private store = inject(Store);
  //public hederValue: string = '';

  readonly statuses: TaskStatus[] = [
    'PENDING',
    'IN_PROGRESS',
    'BLOCKED',
    'COMPLETED',
  ];

  // Signal reactiva para el control elástico del layout
  sidebarCollapsed = signal<boolean>(false);
  hederValue = signal<string>('');
  // Selector global inyectado directo a una Signal de Angular 19
  tasksSignal: Signal<Task[]> = this.store.selectSignal((state: any) => {
    return (state?.tasksFeature?.tasks as Task[]) || [];
  });

  ngOnInit() {
    console.log('Into Here....?');
    this.hederValue.set('board');
    // Si entramos directo o recargamos el Dashboard, aseguramos datos iniciales mockeados
    if (this.tasksSignal().length === 0) {
      this.store.dispatch(
        TasksActions.loadTasksSuccess({
          tasks: [
            // 💡 CORREGIDO: Se agregó "dependsOn: []" para cumplir con la interfaz Task
            {
              id: '1',
              goalId: 'g1',
              title: 'Definir Buyer Persona',
              description:
                'Identificar el público objetivo principal para los anuncios de la app.',
              priority: 'HIGH',
              status: 'PENDING',
              dependsOn: [],
              agentId: 'Agent-Analyst',
              createdAt: '',
            },

            {
              id: '2',
              goalId: 'g1',
              title: 'Diseñar Copywriting de Anuncios',
              description:
                'Crear textos persuasivos para las campañas de Meta y Google Ads.',
              priority: 'MEDIUM',
              status: 'BLOCKED',
              dependsOn: ['1'],
              agentId: 'Agent-Creative',
              createdAt: '',
            },
            {
              id: '3',
              goalId: 'g1',
              title: 'Diseñar Copywriting de Anuncios',
              description:
                'Crear textos persuasivos para las campañas de Meta y Google Ads.',
              priority: 'MEDIUM',
              status: 'BLOCKED',
              dependsOn: ['1'],
              agentId: 'Agent-Creative',
              createdAt: '',
            },

            // 💡 CORREGIDO: Se agregó "dependsOn: []" para cumplir con la interfaz Task
            {
              id: '4',
              goalId: 'g1',
              title: 'Configurar Píxel de Conversión',
              description:
                'Instalar SDK de Firebase y Facebook Pixel para traquear descargas.',
              priority: 'CRITICAL',
              status: 'PENDING',
              dependsOn: [],
              agentId: 'Agent-Dev',
              createdAt: '',
            },

            {
              id: '5',
              goalId: 'g1',
              title: 'Lanzar Campaña de Tráfico',
              description:
                'Publicar anuncios con presupuesto inicial una vez aprobados los copys.',
              priority: 'CRITICAL',
              status: 'IN_PROGRESS',
              dependsOn: ['2', '3'],
              createdAt: '',
            },
            {
              id: '6',
              goalId: 'g1',
              title: 'Lanzar Campaña de Tráfico',
              description:
                'Publicar anuncios con presupuesto inicial una vez aprobados los copys.',
              priority: 'CRITICAL',
              status: 'BLOCKED',
              dependsOn: ['2', '3'],
              createdAt: '',
            },
            {
              id: '7',
              goalId: 'g1',
              title: 'Lanzar Campaña de Tráfico',
              description:
                'Publicar anuncios con presupuesto inicial una vez aprobados los copys.',
              priority: 'CRITICAL',
              status: 'BLOCKED',
              dependsOn: ['2', '3'],
              createdAt: '',
            },
          ],
        }),
      );
    }
  }

  // Filtrado ultrarrápido usando computed() dinámicos por cada estado
  getTasksByStatus(status: TaskStatus): Signal<Task[]> {
    return computed(() =>
      this.tasksSignal().filter((t: Task) => t.status === status),
    );
  }

  onSidebarToggle(collapsed: boolean) {
    this.sidebarCollapsed.set(collapsed);
  }

  onDrop(event: DragEvent, newStatus: TaskStatus) {
    const taskId = event.dataTransfer?.getData('text/plain');
    if (!taskId) return;

    // Despachamos la acción a NgRx; el Effect recalculará de fondo automáticamente
    this.store.dispatch(TasksActions.updateTaskStatus({ taskId, newStatus }));
  }
}
