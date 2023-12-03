import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, forkJoin, of } from 'rxjs';
import { InscripcionActions } from './inscripcion.actions';
import { CreateEnrollmentPayload, Curso, Enrollment, Usuario } from 'src/app/core/models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.local';


@Injectable()
export class InscripcionEffects {

  loadInscripciones$ = createEffect(() => {
    return this.actions$.pipe(

      ofType( InscripcionActions.loadInscripciones ),
      concatMap(() =>
        this.getInscripciones().pipe(
          map( data => InscripcionActions.loadInscripcionesSuccess({ data })),
          catchError( error => of(InscripcionActions.loadInscripcionesFailure({ error }))))
      )
    );
  });

  loadInscripcionesDialogOptions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType( InscripcionActions.loadInscripcionesDialogOptions ),
      concatMap(() => this.getInscripcionDialogOptions().pipe(
        map(( data ) => InscripcionActions.loadInscripcionesDialogOptionsSuccess( data )),
        catchError(( err ) => of(InscripcionActions.loadInscripcionesDialogOptionsFailure({ error: err })))
      ))
    )
  })
  
  createInscripcion$ = createEffect(() => {
    return this.actions$.pipe(
      ofType( InscripcionActions.createInscripcion ),
      concatMap(( action ) => this.createInscripcion( action.payload ).pipe(
        map((data) => InscripcionActions.loadInscripciones()),
        catchError(( err ) => of(InscripcionActions.createInscripcionFailure({ error: err })))
      ))
    )
  })

  constructor(
    private actions$: Actions,
    private httpClient: HttpClient
    ) {}

    createInscripcion(payload: CreateEnrollmentPayload): Observable<Enrollment> {
      return this.httpClient.post<Enrollment>(`${environment.baseUrl}/enrollments`, payload);
    }

  getInscripcionDialogOptions(): Observable<{
    cursos: Curso[];
    estudiantes: Usuario[];
  }> {
    return forkJoin([
      this.httpClient.get<Curso[]>(`${environment.baseUrl}/courses`),
      this.httpClient.get<Usuario[]>(`${environment.baseUrl}/users?role=Estudiante`)
    ]).pipe(
      map(([ cursos, estudiantes ]) => {
        return {
          cursos,
          estudiantes 
        }
      })
    );
  }

  getInscripciones(): Observable<Enrollment[]> {
    return this.httpClient.get<Enrollment[]>(`${environment.baseUrl}/enrollments?_expand=course&_expand=user`);
  }
}
