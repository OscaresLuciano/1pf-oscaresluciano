import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Usuario } from '../../../../../core/models';
import { Store } from '@ngrx/store';
import { selectAuthUser } from 'src/app/store/auth/auth.selectors';
import { UserRole } from 'src/app/core/models/roles.enum';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-usuarios-table',
  templateUrl: './usuarios-table.component.html'
})
export class UsuariosTableComponent {

  usuarioRol$: Observable<UserRole | undefined>

  constructor(private store: Store) {
    this.usuarioRol$ = this.store.select(selectAuthUser).pipe(map((u) => u?.role));
  }

  @Input()
  dataSource: Usuario[] = [];

  @Output()
  deleteUsuario = new EventEmitter<number>();

  @Output()
  editUsuario = new EventEmitter<Usuario>();

  displayedColumns = ['id', 'fullname', 'email', 'actions'];
}
