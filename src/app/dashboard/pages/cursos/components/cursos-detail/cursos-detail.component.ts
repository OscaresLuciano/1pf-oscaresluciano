import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosService } from '../../cursos.service';
import { Curso } from 'src/app/core/models';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-cursos-detail',
  templateUrl: './cursos-detail.component.html',
  styleUrls: ['./cursos-detail.component.scss'],
})
export class CursosDetailComponent implements OnInit {

  curso$: Observable<Curso | undefined> = of(undefined);

  constructor(
    private activatedRoute: ActivatedRoute,
    private cursosService: CursosService
  ) {}

  ngOnInit() {
    const cursoId = +this.activatedRoute.snapshot.params['id'];
    this.curso$ = this.cursosService.getCourseById$(cursoId);
  }

  enroll(): void {
    console.log('Inscripto');
  }
}
