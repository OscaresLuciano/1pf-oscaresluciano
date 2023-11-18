import { Component, Input } from '@angular/core';
import { Curso } from 'src/app/core/models';

@Component({
  selector: 'app-inscripciones-table',
  templateUrl: './inscripciones-table.component.html'
})
export class InscripcionesTableComponent {
  
  @Input()
  dataSource: Curso[] = [];

  enroll(): void {
    console.log('Inscripto')
  }

  displayedColumns = ['id', 'name', 'startDate', 'endDate', 'enroll'];

}
