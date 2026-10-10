import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GoalsState } from './goals.reducer';

export const selectGoalsState =
  createFeatureSelector<GoalsState>('goalsFeature');

export const selectRecentGoals = createSelector(
  selectGoalsState,
  (state: GoalsState) => state.recentGoals,
);
