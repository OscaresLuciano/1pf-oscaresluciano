import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsuariosService } from '../../services/usuarios.service';

import Swal from 'sweetalert2';
import { UserRole, UserRoles } from 'src/app/core/models';

@Component({
  selector: 'app-usuarios-modal',
  templateUrl: './usuarios-modal.component.html',
})
export class UsuariosModalComponent {

  userRoles: UserRole[] = Object.keys(UserRoles) as UserRole[];

  nameControl = new FormControl('',[Validators.required, Validators.minLength(4), Validators.maxLength(20)]);
  lastnameControl = new FormControl('',[Validators.required, Validators.minLength(4), Validators.maxLength(20)]);
  emailControl = new FormControl('',[Validators.required, Validators.email, Validators.minLength(4), Validators.maxLength(30)])
  passwordControl = new FormControl('',[Validators.required, Validators.minLength(4), Validators.maxLength(30)]);
  roleControl = new FormControl('',[Validators.required]);
  
  usuarioForm = new FormGroup({
    name: this.nameControl,
    lastName: this.lastnameControl,
    email: this.emailControl,
    password: this.passwordControl,
    role: this.roleControl,
  });

  constructor(
    private matDialogRef: MatDialogRef<UsuariosModalComponent>,
    private usuariosService: UsuariosService,
    @Inject(MAT_DIALOG_DATA) public usuarioId?: number,
    ) {
      if (usuarioId) {
        this.usuariosService.getUsuarioById$(usuarioId).subscribe({
          next: (c) => {
            if (c) {
              this.usuarioForm.patchValue(c)
            }
          }
        })
      }
  }

  public get isEditing(): boolean {
    return !!this.usuarioId
  }

  onSubmit(): void {
    if (this.usuarioForm.invalid) {
      this.usuarioForm.markAllAsTouched();
    } else {
      this.matDialogRef.close(this.usuarioForm.value);
      Swal.fire(
        '',
        this.isEditing ? "Usuario editado correctamente!" : "Usuario agregado correctamente!",
        'success'
      )
    }
  }

}
