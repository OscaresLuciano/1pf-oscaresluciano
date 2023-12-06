import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursosService } from '../../services/cursos.service';
import { Curso, Inscripcion, Usuario } from 'src/app/core/models';
import { Observable, map, of } from 'rxjs';
import { InscripcionesService } from '../../../inscripciones/services/inscripciones.service';
import { Store } from '@ngrx/store';
import { selectAuthUser } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-cursos-detail',
  templateUrl: './cursos-detail.component.html',
  styleUrls: ['./cursos-detail.component.scss'],
})
export class CursosDetailComponent implements OnInit {

  curso$: Observable<Curso | undefined> = of(undefined);
  inscripciones$: Observable<Inscripcion[]> = of([]);
  usuarioRol$: Observable<Usuario['role'] | undefined>

  constructor(
    private activatedRoute: ActivatedRoute,
    private cursosService: CursosService,
    private inscripcionesService: InscripcionesService,
    private store: Store
  ) {
    this.usuarioRol$ = this.store.select(selectAuthUser).pipe(map((u) => u?.role));
  }

  ngOnInit() {
    const cursoId = +this.activatedRoute.snapshot.params['id'];
    this.curso$ = this.cursosService.getCursoWithInscripciones$(cursoId).pipe(
      map(data => data.curso)
    );
    this.inscripciones$ = this.cursosService.getCursoWithInscripciones$(cursoId).pipe(
      map(data => data.inscripciones)
    );
  }

  eliminarInscripcion(inscripcionId: number): void {
    if (inscripcionId) {
      this.cursosService.deleteInscripcionCurso$(inscripcionId).subscribe(() => {
        const cursoId = +this.activatedRoute.snapshot.params['id'];
        this.inscripciones$ = this.cursosService.getCursoWithInscripciones$(cursoId).pipe(
          map(data => data.inscripciones)
        );
      });
    }
  }
}
