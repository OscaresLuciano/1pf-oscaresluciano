import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlumnosService } from '../../alumnos.service';


import Swal from 'sweetalert2';

@Component({
  selector: 'app-alumnos-modal',
  templateUrl: './alumnos-modal.component.html',
})
export class AlumnosModalComponent {

  nameControl = new FormControl('',[Validators.required, Validators.minLength(4), Validators.maxLength(20)]);
  lastnameControl = new FormControl('',[Validators.required, Validators.minLength(4), Validators.maxLength(20)]);
  emailControl = new FormControl('',[Validators.required, Validators.email, Validators.minLength(4), Validators.maxLength(30)])
  
  alumnoForm = new FormGroup({
    name: this.nameControl,
    lastName: this.lastnameControl,
    email: this.emailControl,
  });

  constructor(
    private matDialogRef: MatDialogRef<AlumnosModalComponent>,
    private alumnosService: AlumnosService,
    @Inject(MAT_DIALOG_DATA) public alumnoId?: number,
    ) {
      if (alumnoId) {
        this.alumnosService.getAlumnoById$(alumnoId).subscribe({
          next: (c) => {
            if (c) {
              this.alumnoForm.patchValue(c)
            }
          }
        })
      }
  }

  public get isEditing(): boolean {
    return !!this.alumnoId
  }

  onSubmit(): void {
    if (this.alumnoForm.invalid) {
      this.alumnoForm.markAllAsTouched();
    } else {
      this.matDialogRef.close(this.alumnoForm.value);
      Swal.fire(
        '',
        this.isEditing ? "Alumno editado correctamente!" : "Alumno agregado correctamente!",
        'success'
      )
    }
  }

}
