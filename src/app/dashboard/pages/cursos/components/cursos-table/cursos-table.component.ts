import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { Curso } from 'src/app/core/models';
import { UserRole } from 'src/app/core/models/roles.enum';
import { selectAuthUser } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-cursos-table',
  templateUrl: './cursos-table.component.html'
})
export class CursosTableComponent {

  usuarioRol$: Observable<UserRole | undefined>

  constructor(private store: Store) {
    this.usuarioRol$ = this.store.select(selectAuthUser).pipe(map((u) => u?.role));
  }

  @Input()
  dataSource: Curso[] = [];

  @Output()
  deleteCourse = new EventEmitter<number>();

  @Output()
  editCourse = new EventEmitter<Curso>();

  displayedColumns = ['id', 'name', 'startDate', 'endDate', 'actions'];

}