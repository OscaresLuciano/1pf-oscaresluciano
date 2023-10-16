import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Alumno } from '../../modals';

@Component({
  selector: 'app-alumnos-modal',
  templateUrl: './alumnos-modal.component.html',
})
export class AlumnosModalComponent {

  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<AlumnosModalComponent>,
    @Inject(MAT_DIALOG_DATA) public editarAlumno?: Alumno,
    ) {
    this.userForm = fb.group({
      name: ['',[Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      lastName: ['',[Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      email: ['',[Validators.required, Validators.email, Validators.minLength(4), Validators.maxLength(30)]],
    });

    if (this.editarAlumno) {
      this.userForm.patchValue(this.editarAlumno);
    }
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
    } else {
      this.matDialogRef.close(this.userForm.value);
    }
  }

}
