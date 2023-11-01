import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Curso } from 'src/app/core/models';
import { CursosService } from '../cursos/cursos.service';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.scss']
})
export class InscripcionesComponent {

  courses$: Observable<Curso[]>;

  constructor(
      private cursosService: CursosService
    ) {
    this.courses$ = this.cursosService.getCourses$()
  }

}
