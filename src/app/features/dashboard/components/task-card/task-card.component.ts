import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../../../core/models/task.model';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.sass'],
})
export class TaskCardComponent {
  // Inputs modernos basados en Angular Signals
  task = input.required<Task>();

  // Emiisón de eventos nativos usando la API output()
  dragged = output<string>();

  onDragStart(event: DragEvent) {
    event.dataTransfer?.setData('text/plain', this.task().id);
    this.dragged.emit(this.task().id);
  }
}
