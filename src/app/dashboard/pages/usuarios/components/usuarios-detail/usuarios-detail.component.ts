import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Usuario } from 'src/app/core/models';
import { UsuariosService } from '../../usuarios.service';

@Component({
  selector: 'app-usuarios-detail',
  templateUrl: './usuarios-detail.component.html',
  styleUrls: ['./usuarios-detail.component.scss']
})
export class UsuariosDetailComponent implements OnInit {
  
  usuario$: Observable<Usuario | undefined> = of(undefined);

  constructor(
    private activatedRoute: ActivatedRoute,
    private usuariosService: UsuariosService
  ) {}

  ngOnInit() {
    const cursoId = +this.activatedRoute.snapshot.params['id'];
    this.usuario$ = this.usuariosService.getUsuarioById$(cursoId);
  }
}
