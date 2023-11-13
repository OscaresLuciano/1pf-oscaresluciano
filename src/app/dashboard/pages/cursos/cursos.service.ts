import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, concatMap } from 'rxjs';
import { Curso } from 'src/app/core/models';
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

}
