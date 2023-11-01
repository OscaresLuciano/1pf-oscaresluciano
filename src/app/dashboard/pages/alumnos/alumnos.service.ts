import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Alumno } from '../../../core/models';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  alumnos: Alumno[] = [
    {
      id: 1,
      name: 'Pablo',
      lastName: 'Salazar',
      email: 'pablo@mail.com'
    },
    {
      id: 2,
      name: 'Laura',
      lastName: 'Sosa',
      email: 'lauso@mail.com'
    },
    {
      id: 3,
      name: 'Mateo',
      lastName: 'Ruiz',
      email: 'ruizmate@mail.com'
    }
  ]

  constructor() { }
  
  getAlumnos$(): Observable<Alumno[]> {
    return of (this.alumnos)
  }

  createAlumnos$(payload: Alumno): Observable<Alumno[]> {
    this.alumnos.push(payload);
    return of([...this.alumnos]);
  }

  deleteAlumnos$(courseId: number): Observable<Alumno[]> {
    this.alumnos = this.alumnos.filter((c) => c.id !== courseId );
    return of(this.alumnos);
  }

  editAlumnos$(id: number, payload: Alumno): Observable<Alumno[]> {
    return of(
      this.alumnos.map((c) => (c.id === id ? { ...c, ...payload } : c))
    );
  }

  getAlumnoById$(id: number): Observable<Alumno | undefined> {
    return of(this.alumnos.find((c) => c.id === id));
  }
  
}
