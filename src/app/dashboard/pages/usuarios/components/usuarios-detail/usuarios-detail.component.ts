import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { Inscripcion, Usuario } from 'src/app/core/models';
import { UsuariosService } from '../../services/usuarios.service';
import { Store } from '@ngrx/store';
import { selectAuthUser } from 'src/app/store/auth/auth.selectors';
import { InscripcionesService } from '../../../inscripciones/services/inscripciones.service';

@Component({
  selector: 'app-usuarios-detail',
  templateUrl: './usuarios-detail.component.html',
  styleUrls: ['./usuarios-detail.component.scss']
})
export class UsuariosDetailComponent implements OnInit {
  
  usuario$: Observable<Usuario | undefined> = of(undefined);
  inscripciones$: Observable<Inscripcion[]> = of([]);
  usuarioRol$: Observable<Usuario['role'] | undefined>

  constructor(
    private activatedRoute: ActivatedRoute,
    private usuariosService: UsuariosService,
    private inscripcionesService: InscripcionesService,
    private store: Store
  ) {
    this.usuarioRol$ = this.store.select(selectAuthUser).pipe(map((u) => u?.role));
  }

  ngOnInit() {
    const userId = +this.activatedRoute.snapshot.params['id'];
    this.usuario$ = this.usuariosService.getUsuarioById$(userId);

    const userWithInscriptions$ = this.usuariosService.getUsuarioWithInscripciones$(userId);

    this.usuario$ = userWithInscriptions$.pipe(map(data => data.usuario));
    this.inscripciones$ = userWithInscriptions$.pipe(map(data => data.inscripciones));
  }

  eliminarInscripcion(inscripcionId: number): void {
    if (inscripcionId) {
      this.inscripcionesService.deleteInscripcionUsuario$(inscripcionId).subscribe(() => {
        const userId = +this.activatedRoute.snapshot.params['id'];
        this.inscripciones$ = this.usuariosService.getUsuarioWithInscripciones$(userId).pipe(
          map(data => data.inscripciones)
        );
      });
    }
  }
}
