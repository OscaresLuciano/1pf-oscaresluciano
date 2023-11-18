import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Curso } from 'src/app/core/models';

@Component({
  selector: 'app-cursos-table',
  templateUrl: './cursos-table.component.html'
})
export class CursosTableComponent {

  @Input()
  dataSource: Curso[] = [];

  @Output()
  deleteCourse = new EventEmitter<number>();

  @Output()
  editCourse = new EventEmitter<Curso>();

  displayedColumns = ['id', 'name', 'startDate', 'endDate', 'actions'];

}