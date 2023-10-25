import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alumno } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  constructor() { }
  
  getAlumnos(): Observable<Alumno[]> {
    return new Observable((subscriber) => { subscriber.next([
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
      ])
    });
  }
}
