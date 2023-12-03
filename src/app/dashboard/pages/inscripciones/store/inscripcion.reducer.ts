import { createFeature, createReducer, on } from '@ngrx/store';
import { InscripcionActions } from './inscripcion.actions';
import { Curso, Enrollment, Usuario } from 'src/app/core/models';

export const inscripcionFeatureKey = 'inscripcion';

export interface State {
  isLoading: boolean;
  inscripciones: Enrollment[];
  error: unknown;
  isLoadingDialogOptions: boolean;
  cursoOptions: Curso[];
  estudianteOptions: Usuario[];
}

export const initialState: State = {
  isLoading: false,
  isLoadingDialogOptions: false,
  inscripciones: [],
  error: null,
  cursoOptions: [],
  estudianteOptions: [],
};

export const reducer = createReducer(
  initialState,

  //* Load Inscripciones
  on(InscripcionActions.loadInscripciones, state => ({...state, isLoading: true})),

  //* Load Inscripciones Success
  on(InscripcionActions.loadInscripcionesSuccess, (state, { data }) => ({ ...state, isLoading: false, inscripciones: data })),

  //* Load Inscripciones Failure
  on(InscripcionActions.loadInscripcionesFailure, (state, { error }) => ({ ...state, isLoading: false, error })),

  //* Load Inscripciones Dialog Options
  on(InscripcionActions.loadInscripcionesDialogOptions, state => ({ ...state, isLoadingDialogOptions: true})),

  //* Load Inscripciones Dialog Options Success
  on( InscripcionActions.loadInscripcionesDialogOptionsSuccess, (state, action) => ({ 
    ...state,
    cursoOptions: action.cursos,
    estudianteOptions: action.estudiantes,
    isLoadingDialogOptions : false,
  })),

  //* Load Inscripciones Dialog Options Failure
  on( InscripcionActions.loadInscripcionesDialogOptionsFailure, (state, action) => ({
    ...state,
    error: action.error,
    isLoadingDialogOptions: false,
  })),
  
  );

export const inscripcionFeature = createFeature({
  name: inscripcionFeatureKey,
  reducer,
});

