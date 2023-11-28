import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { InscripcionActions } from './inscripcion.actions';


@Injectable()
export class InscripcionEffects {

  loadInscripcions$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscripcionActions.loadInscripcions),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => InscripcionActions.loadInscripcionsSuccess({ data })),
          catchError(error => of(InscripcionActions.loadInscripcionsFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions) {}
}
