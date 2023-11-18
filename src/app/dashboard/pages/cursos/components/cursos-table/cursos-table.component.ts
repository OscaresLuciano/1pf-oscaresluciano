import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Curso } from 'src/app/core/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cursos-table',
  templateUrl: './cursos-table.component.html'
})
export class CursosTableComponent {

  @Input()
  dataSource: Curso[] = [];

  @Output()
  deleteCourse = new EventEmitter();

  @Output()
  editCourse = new EventEmitter();

  displayedColumns = ['id', 'name', 'startDate', 'endDate', 'actions'];

}