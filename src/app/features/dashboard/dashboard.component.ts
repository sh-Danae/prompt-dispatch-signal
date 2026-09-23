import { Component, computed, signal } from '@angular/core';
import { Task, TaskStatus } from '../../core/models/task.model';
import { CommonModule } from '@angular/common';
import { TaskCardComponent } from './components/task-card/task-card.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TaskCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.sass',
})
export class DashboardComponent {
  readonly statuses: TaskStatus[] = [
    'PENDING',
    'IN_PROGRESS',
    'BLOCKED',
    'COMPLETED',
  ];

  // Signal que simula la fuente de datos del Store
  tasks = signal<Task[]>([
    {
      id: '1',
      goalId: 'g1',
      title: 'Definir Buyer Persona',
      description:
        'Identificar el público objetivo principal para los anuncios de la app.',
      priority: 'HIGH',
      status: 'COMPLETED',
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
      status: 'IN_PROGRESS',
      dependsOn: ['1'],
      agentId: 'Agent-Creative',
      createdAt: '',
    },
    {
      id: '3',
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
      id: '4',
      goalId: 'g1',
      title: 'Lanzar Campaña de Tráfico',
      description:
        'Publicar anuncios con presupuesto inicial una vez aprobados los copys.',
      priority: 'CRITICAL',
      status: 'BLOCKED',
      dependsOn: ['2', '3'],
      createdAt: '',
    },
  ]);

  // Filtrado ultrarrápido usando computed() dinámicos por cada estado
  getTasksByStatus(status: TaskStatus) {
    return computed(() => this.tasks().filter((t) => t.status === status));
  }

  onDrop(event: DragEvent, newStatus: TaskStatus) {
    const taskId = event.dataTransfer?.getData('text/plain');
    if (!taskId) return;

    // Actualización inmutable reactiva simulando la acción que haría NgRx
    this.tasks.update((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task,
      ),
    );

    // NOTA: Aquí agregaremos más adelante el disparador del Effect para recalcular dependencias de forma inteligente
  }
}
