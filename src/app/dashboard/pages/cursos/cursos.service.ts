import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Curso } from 'src/app/core/models';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  courses: Curso[] = [
    {
      id: 1,
      name: 'Javascript',
      startDate: new Date(),
      endDate: new Date()
    },
    {
      id: 2,
      name: 'Angular',
      startDate: new Date(),
      endDate: new Date()
    },
    {
      id: 3,
      name: 'React',
      startDate: new Date(),
      endDate: new Date()
    },
  ];

  constructor() { }

  getCourses$(): Observable<Curso[]> {
    return of (this.courses)
  }

  createCourse$(payload: Curso): Observable<Curso[]> {
    this.courses.push(payload);
    return of([...this.courses]);
  }

  deleteCourses$(courseId: number): Observable<Curso[]> {
    this.courses = this.courses.filter((c) => c.id !== courseId );
    return of(this.courses);
  }

  editCourse$(id: number, payload: Curso): Observable<Curso[]> {
    return of(
      this.courses.map((c) => (c.id === id ? { ...c, ...payload } : c))
    );
  }

  getCourseById$(id: number): Observable<Curso | undefined> {
    return of(this.courses.find((c) => c.id === id));
  }

}
