import { createReducer, on } from '@ngrx/store';
import { GoalsActions } from './goals.actions';

export interface GoalsState {
  recentGoals: string[]; // Almacena los últimos 3 textos del textarea
  activeGoalId: string | null;
}

export const initialGoalsState: GoalsState = {
  // Sugerencias por defecto si el historial está vacío al iniciar
  recentGoals: [
    'Quiero lanzar una campaña de marketing digital para mi app móvil de finanzas, incluyendo diseño de copies, configuración de píxeles de conversión y analítica.',
    'Necesito migrar mi tienda de Shopify a un desarrollo propio en Angular, manteniendo SEO, reestructurando pasarelas de pago y optimizando imágenes.',
    'Planificar una auditoría de ciberseguridad completa para nuestra infraestructura cloud en AWS, configurando políticas IAM y escaneando vulnerabilidades.',
  ],
  activeGoalId: null,
};

export const goalsReducer = createReducer(
  initialGoalsState,

  on(GoalsActions.saveRecentGoal, (state, { text }) => {
    // Evitamos duplicar exactamente el mismo prompt seguido si el usuario hace clic varias veces
    if (state.recentGoals[0] === text.trim()) return state;

    // Agregamos al inicio y recortamos para mantener estrictamente el TOP 3
    const updatedGoals = [text.trim(), ...state.recentGoals].slice(0, 3);

    return {
      ...state,
      recentGoals: updatedGoals,
    };
  }),
);
