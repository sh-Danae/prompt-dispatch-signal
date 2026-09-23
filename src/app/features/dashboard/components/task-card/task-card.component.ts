import { Component, input, output } from '@angular/core';
import { Task } from '../../../../core/models/task.model';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.sass',
})
export class TaskCardComponent {
  // Inputs usando Signals (Angular 19)
  task = input.required<Task>();

  // Outputs usando la nueva API output()
  dragged = output<string>();

  onDragStart(event: DragEvent) {
    event.dataTransfer?.setData('text/plain', this.task().id);
    this.dragged.emit(this.task().id);
  }
}
