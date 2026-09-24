import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass'],
})
export class SidebarComponent {
  // Signal para contraer/expandir el panel izquierdo estilo Gemini
  isCollapsed = signal<boolean>(false);
  // 💡 NUEVO: Emiisón de evento hacia el padre
  collapsedChanged = output<boolean>();

  // Historial simulado de planes orquestados por el usuario
  readonly recentPlans = [
    { id: '1', title: 'Campaña Marketing App' },
    { id: '2', title: 'Migración Shopify a Angular' },
    { id: '3', title: 'Auditoría AWS Cloud' },
  ];

  toggleSidebar() {
    this.isCollapsed.update((state) => !state);
    // Notificamos el nuevo estado
    this.collapsedChanged.emit(this.isCollapsed());
  }
}
