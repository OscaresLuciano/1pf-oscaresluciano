import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Alumno } from '../../../../../core/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alumnos-table',
  templateUrl: './alumnos-table.component.html',
  styles: [
  ]
})
export class AlumnosTableComponent {

  @Input()
  dataSource: Alumno[] = [];

  @Output()
  deleteAlumno = new EventEmitter<number>();

  @Output()
  editAlumno = new EventEmitter<Alumno>();

  displayedColumns = ['id', 'fullname', 'email', 'actions'];

  constructor(private router: Router) {}

  gotToDetails(alumnoId: number): void {
    this.router.navigate(['dashboard','alumnos','details', alumnoId]);
  }
}
