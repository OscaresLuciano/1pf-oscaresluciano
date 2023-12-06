import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, concatMap, map, of } from 'rxjs';
import { Curso, Inscripcion } from 'src/app/core/models';
import { environment } from 'src/environments/environment.local';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  courses: Curso[] = [];

  constructor(
    private httpClient: HttpClient,
  ) { }

  getCourses$(): Observable<Curso[]> {
    return this.httpClient
      .get<Curso[]>(`${environment.baseUrl}/courses`);
  }

  createCourse$(payload: Curso): Observable<Curso[]> {
    return this.httpClient
      .post<Curso>(`${environment.baseUrl}/courses`, payload)
      .pipe(concatMap(() => this.getCourses$()));
  }

  deleteCourses$(cursoId: number): Observable<Curso[]> {
    return this.httpClient
      .delete<Curso>(`${environment.baseUrl}/courses/${cursoId}`)
      .pipe(concatMap(() => this.getCourses$()));
  }

  editCourse$(cursoId: number, payload: Curso): Observable<Curso[]> {
    return this.httpClient
      .put<Curso>(`${environment.baseUrl}/courses/${cursoId}`, payload)
      .pipe(concatMap(() => this.getCourses$()));
  }

  getCourseById$(cursoId: number): Observable<Curso | undefined> {
    return this.httpClient
      .get<Curso>(`${environment.baseUrl}/courses/${cursoId}`);
  }
  
  getCursoWithInscripciones$(cursoId: number): Observable<{ curso: Curso | undefined, inscripciones: Inscripcion[] }> {
    return this.getCourseById$(cursoId).pipe(
      concatMap((curso: Curso | undefined) => {
        if (curso) {
          return this.httpClient.get<Inscripcion[]>(`${environment.baseUrl}/enrollments?courseId=${cursoId}&_expand=course&_expand=user`).pipe(
            map((inscripciones: Inscripcion[]) => ({ curso, inscripciones }))
          );
        } else {
          return of({ curso: undefined, inscripciones: [] });
        }
      })
    );
  }
  
  deleteInscripcionCurso$(inscripcionId: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.baseUrl}/enrollments/${inscripcionId}`);
  }

}
