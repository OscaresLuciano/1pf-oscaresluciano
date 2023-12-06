import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, concatMap, forkJoin, map } from 'rxjs';
import { Curso, Inscripcion, Usuario } from 'src/app/core/models';
import { environment } from 'src/environments/environment.local';

@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {
  
  inscripciones: Inscripcion[] = [];

  constructor(
    private httpClient: HttpClient
  ) { }

  getInscripciones$(): Observable<Inscripcion[]> {
    return this.httpClient
      .get<Inscripcion[]>(`${environment.baseUrl}/enrollments?_expand=course&_expand=user`)
  }

  createInscripcion$(payload: Inscripcion): Observable<Inscripcion[]> {
    return this.httpClient
      .post<Inscripcion>(`${environment.baseUrl}/enrollments`, payload)
      .pipe(concatMap(() => this.getInscripciones$()));
  }

  deleteInscripciones$(inscripcionId: number): Observable<Inscripcion[]> {
    return this.httpClient
      .delete<Inscripcion>(`${environment.baseUrl}/enrollments/${inscripcionId}`)
      .pipe(concatMap(() => this.getInscripciones$()));
  }

  editInscripcion$(inscripcionId: number, payload: Inscripcion): Observable<Inscripcion[]> {
    return this.httpClient
      .put<Inscripcion>(`${environment.baseUrl}/enrollments/${inscripcionId}`, payload)
      .pipe(concatMap(() => this.getInscripciones$()));
  }

  getInscripcionDialogOptions$(): Observable<{
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

  getInscripcionById$(inscripcionId: number): Observable<Inscripcion | undefined> {
    return this.httpClient
      .get<Inscripcion>(`${environment.baseUrl}/enrollments/${inscripcionId}`);
  }

  deleteInscripcionUsuario$(inscripcionId: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.baseUrl}/enrollments/${inscripcionId}`);
  }

  deleteInscripcionCurso$(inscripcionId: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.baseUrl}/enrollments/${inscripcionId}`);
  }
}
