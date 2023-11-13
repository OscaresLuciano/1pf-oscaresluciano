import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsuariosModalComponent } from './components/usuarios-modal/usuarios-modal.component';
import { Usuario } from '../../../core/models';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { UsuariosService } from './usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent {

  usuarios$: Observable<Usuario[]>;

  constructor(
    private usuariosService: UsuariosService,
    private matDialog: MatDialog
  ) {
    this.usuarios$ = this.usuariosService.getUsuarios$()
  }
  
  addUsuario() : void {
    this.matDialog
    .open(UsuariosModalComponent)
    .afterClosed()
    .subscribe({
      next: (v) => {
        if (!!v) {
          this.usuarios$ = this.usuariosService.createUsuarios$(v);
        }
      }
    })
  }
  
  
  onDeleteUsuario(courseId: number) : void {
    Swal.fire({
      title: 'Confirmar eliminación',
      text: 'Estás seguro de borrar este usuario?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar usuario',
      cancelButtonText: 'Cancelar'
    }).then((v) => {
      if (v.isConfirmed) {
        this.usuarios$ = this.usuariosService.deleteUsuarios$(courseId);
      }
    });
  }
  
  onEditUsuario(usuario: Usuario): void {
    //usar generateRandomString(longitud) para generar token
    this.matDialog
      .open(UsuariosModalComponent, {
        data: usuario.id,
      })
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (!!v) {
            this.usuarios$ = this.usuariosService.editUsuarios$(usuario.id, v);
          }
        },
      });
  }

}
