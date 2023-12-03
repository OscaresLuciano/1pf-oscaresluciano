import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Curso, Enrollment, Usuario } from 'src/app/core/models';
import { CreateEnrollmentPayload } from 'src/app/core/models/index';

export const InscripcionActions = createActionGroup({
  source: 'Inscripcion',
  events: {
    'Load Inscripciones': emptyProps(),
    'Load Inscripciones Success': props<{ data: Enrollment[] }>(),
    'Load Inscripciones Failure': props<{ error: unknown }>(),
    'Load Inscripciones Dialog Options': emptyProps(),
    'Load Inscripciones Dialog Options Success': props<{
      cursos: Curso[],
      estudiantes: Usuario[]
    }>(),
    'Load Inscripciones Dialog Options Failure': props<{ error: unknown }>(),
    'Create Inscripcion': props<{ payload: CreateEnrollmentPayload }>(),
    'Create Inscripcion Failure': props<{ error: unknown }>(),
  }
});
