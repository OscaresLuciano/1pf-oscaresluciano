import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CursosService } from '../../services/cursos.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-cursos-modal',
  templateUrl: './cursos-modal.component.html'
})
export class CursosModalComponent {

  nameValue = "";

  nameControl = new FormControl('',[Validators.required, Validators.minLength(4), Validators.maxLength(20)]);
  startDateControl = new FormControl('',[Validators.required]);
  endDateControl = new FormControl('',[Validators.required]);

  courseForm = new FormGroup({
    name: this.nameControl,
    startDate: this.startDateControl,
    endDate: this.endDateControl 
  })

  constructor(
    private matDialogRef: MatDialogRef<CursosModalComponent>,
    private cursosService: CursosService,
    @Inject(MAT_DIALOG_DATA) private courseId?: number,
    ) {
      if (courseId) {
        this.cursosService.getCourseById$(courseId).subscribe({
          next: (c) => {
            if (c) {
              this.courseForm.patchValue(c)
            }
          }
        })
      }

    }

    public get isEditing(): boolean {
      return !!this.courseId
    }

  onSubmit(): void {
    if (this.courseForm.invalid) {
      return this.courseForm.markAllAsTouched();
    } else {
      this.matDialogRef.close(this.courseForm.value);
      Swal.fire(
        '',
        this.isEditing ? "Curso editado correctamente!" : "Curso agregado correctamente!",
        'success'
      )
    }
  }
}
