import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Usuario } from '../../../../../core/models';

@Component({
  selector: 'app-usuarios-table',
  templateUrl: './usuarios-table.component.html'
})
export class UsuariosTableComponent {

  @Input()
  dataSource: Usuario[] = [];

  @Output()
  deleteUsuario = new EventEmitter<number>();

  @Output()
  editUsuario = new EventEmitter<Usuario>();

  displayedColumns = ['id', 'fullname', 'email', 'role', 'actions'];
}
