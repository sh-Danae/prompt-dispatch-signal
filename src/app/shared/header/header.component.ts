import { Component, input } from '@angular/core'; // 💡 Importa input
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent {
  isSidebarCollapsed = input<boolean>(false);

  readonly menuItems = [
    { label: 'prompt', icon: '🎨', active: true },
    { label: 'Task', icon: '🎨', active: false },
    { label: 'Board', icon: '🎨', active: false },
    { label: 'Graphic', icon: '🎨', active: false },
    { label: 'Modo Orchestrator AI', icon: '🧠', active: false },
    { label: 'Todos', icon: '🧠', active: false },
    { label: 'Imagen', icon: '🎨', active: false },
  ];
}
