import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Alumno } from '../../../../../core/models';

@Component({
  selector: 'app-alumnos-table',
  templateUrl: './alumnos-table.component.html'
})
export class AlumnosTableComponent {

  @Input()
  dataSource: Alumno[] = [];

  @Output()
  deleteAlumno = new EventEmitter<number>();

  @Output()
  editAlumno = new EventEmitter<number>();

  displayedColumns = ['id', 'fullname', 'email', 'actions'];
}
