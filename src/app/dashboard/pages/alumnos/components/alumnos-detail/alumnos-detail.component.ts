import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Alumno } from 'src/app/core/models';
import { AlumnosService } from '../../alumnos.service';

@Component({
  selector: 'app-alumnos-detail',
  templateUrl: './alumnos-detail.component.html',
  styleUrls: ['./alumnos-detail.component.scss']
})
export class AlumnosDetailComponent implements OnInit {
  
  alumno$: Observable<Alumno | undefined> = of(undefined);

  constructor(
    private activatedRoute: ActivatedRoute,
    private alumnosService: AlumnosService
  ) {}

  ngOnInit() {
    const cursoId = +this.activatedRoute.snapshot.params['id'];
    this.alumno$ = this.alumnosService.getAlumnoById$(cursoId);
  }

  enroll(): void {
    console.log('Inscripto');
  }
}
