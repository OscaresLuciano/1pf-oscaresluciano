import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { Inscripcion, Usuario } from 'src/app/core/models';
import { selectAuthUser } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-inscripciones-table',
  templateUrl: './inscripciones-table.component.html'
})
export class InscripcionesTableComponent {

  usuarioRol$: Observable<Usuario['role'] | undefined>

  constructor(private store: Store) {
    this.usuarioRol$ = this.store.select(selectAuthUser).pipe(map((u) => u?.role));
  }
  
  @Input()
  dataSource: Inscripcion[] = [];
  
  @Output()
  deleteInscripcion = new EventEmitter<number>();
  
  @Output()
  editInscripcion = new EventEmitter<Inscripcion>();
  
  displayedColumns = ['id', 'name', 'startDate', 'endDate', 'student', 'actions'];

}