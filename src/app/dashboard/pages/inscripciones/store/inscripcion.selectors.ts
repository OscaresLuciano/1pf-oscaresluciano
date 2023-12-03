import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromInscripcion from './inscripcion.reducer';

export const selectInscripcionesState = createFeatureSelector<fromInscripcion.State>(
  fromInscripcion.inscripcionFeatureKey
);

export const selectEnrollments = createSelector(selectInscripcionesState, (state) => state.inscripciones);

export const selectEnrollmentsIsLoading = createSelector(selectInscripcionesState, (state) => state.isLoading);

export const selectCursoOptions = createSelector(selectInscripcionesState, (state) => state.cursoOptions);

export const selectEstudianteOptions = createSelector(selectInscripcionesState, (state) => state.estudianteOptions);

export const selectEnrollmentsIsLoadingDialogOptions = createSelector(selectInscripcionesState, (state) => state.isLoadingDialogOptions);