import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Curso, Enrollment } from 'src/app/core/models';
import { selectEnrollments, selectEnrollmentsIsLoading } from '../../store/inscripcion.selectors';

@Component({
  selector: 'app-inscripciones-table',
  templateUrl: './inscripciones-table.component.html'
})
export class InscripcionesTableComponent {

  inscripciones$: Observable<Enrollment[]>;
  isLoading$: Observable<boolean>;

  constructor(private store: Store) {
    this.inscripciones$ = this.store.select(selectEnrollments);
    this.isLoading$ = this.store.select(selectEnrollmentsIsLoading);
  }
  
  @Input()
  dataSource: Curso[] = [];

  enroll(course: any) {
    course.inscrito = true;
  }

  displayedColumns = ['id', 'name', 'startDate', 'endDate', 'student', 'enroll'];

}
