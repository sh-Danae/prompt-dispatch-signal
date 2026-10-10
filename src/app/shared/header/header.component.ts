import { Component, computed, input, output } from '@angular/core'; // 💡 Importamos output
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
  hederValue = input<string>();

  // 💡 NUEVO: Emitirá el nombre de la pestaña al hacer clic hacia el PromptWizard
  hederValueChange = output<string>();

  readonly rawMenuItems = [
    { label: 'Prompts', icon: '🎨', active: true },
    { label: 'Board', icon: '🎨', active: false },
    { label: 'Tasks', icon: '🎨', active: false },
    { label: 'Graphic', icon: '🎨', active: false },
  ];

  // Ejecuta la emisión del evento hacia el padre
  selectTab(label: string) {
    this.hederValueChange.emit(label);
  }

  public menuItems = computed(() => {
    const currentValue = this.hederValue();
    return this.rawMenuItems.map((item) => ({
      ...item,
      active:
        item.label.toLocaleLowerCase() === currentValue?.toLocaleLowerCase(),
    }));
  });
}
