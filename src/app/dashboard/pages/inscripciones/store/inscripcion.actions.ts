import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const InscripcionActions = createActionGroup({
  source: 'Inscripcion',
  events: {
    'Load Inscripcions': emptyProps(),
    'Load Inscripcions Success': props<{ data: unknown }>(),
    'Load Inscripcions Failure': props<{ error: unknown }>(),
  }
});
