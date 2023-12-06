import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CursosService } from '../../services/cursos.service';

import Swal from 'sweetalert2';
import { Curso } from 'src/app/core/models';

@Component({
  selector: 'app-cursos-modal',
  templateUrl: './cursos-modal.component.html'
})
export class CursosModalComponent {

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
        const newCourse = this.courseForm.value;
        this.cursosService.getCourses$().subscribe((cursos: Curso[]) => {
          const courseExists = cursos.some(curso =>
            this.areDatesEqual(curso.startDate, newCourse.startDate) &&
            this.areDatesEqual(curso.endDate, newCourse.endDate)
          );
          if (courseExists) {
            Swal.fire('', 'El curso ya existe en la base de datos', 'error');
          } else {
            this.matDialogRef.close(newCourse);
            Swal.fire(
              '',
              this.isEditing ? 'Curso editado correctamente!' : 'Curso agregado correctamente!',
              'success'
            );
          }
        });
      }
    }
  
    areDatesEqual(date1: string | null | undefined, date2: string | null | undefined): boolean {
      if (!date1 || !date2) {
        return date1 === date2; // Si ambos son null o undefined, se consideran iguales
      }
      return new Date(date1).getTime() === new Date(date2).getTime();
    }
}
