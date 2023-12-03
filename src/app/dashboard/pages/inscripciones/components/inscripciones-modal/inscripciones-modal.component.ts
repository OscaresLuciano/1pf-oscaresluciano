import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { InscripcionActions } from '../../store/inscripcion.actions';
import { Observable, take } from 'rxjs';
import { Curso, Usuario } from 'src/app/core/models';
import { selectCursoOptions, selectEnrollmentsIsLoadingDialogOptions, selectEstudianteOptions } from '../../store/inscripcion.selectors';
import { Actions, ofType } from '@ngrx/effects';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-inscripciones-modal',
  templateUrl: './inscripciones-modal.component.html'
})
export class InscripcionesModalComponent {
    
  cursoOptions$: Observable<Curso[]>;
  estudianteOptions$: Observable<Usuario[]>
  isLoading$: Observable<boolean>

  courseIdControl = new FormControl<number | null>(null,[Validators.required]);
  userIdControl = new FormControl<number | null>(null,[Validators.required]);

  inscripcionesForm = new FormGroup({
    courseId: this.courseIdControl,
    userId: this.userIdControl,
  })

  constructor(
    private store: Store,
    private actions$: Actions,
    private matDialogRef: MatDialogRef<InscripcionesModalComponent>
    ){
    this.store.dispatch(InscripcionActions.loadInscripcionesDialogOptions());

    this.cursoOptions$ = this.store.select(selectCursoOptions);
    this.estudianteOptions$ = this.store.select(selectEstudianteOptions);
    this.isLoading$ = this.store.select(selectEnrollmentsIsLoadingDialogOptions);

    this.actions$
      .pipe(ofType(InscripcionActions.loadInscripciones), take(1))
      .subscribe({
        next: () => this.matDialogRef.close()
      });
  }

  onSubmit(): void {
    if(this.inscripcionesForm.invalid) {
      return this.inscripcionesForm.markAllAsTouched();
    } else {
      this.store.dispatch(
        InscripcionActions.createInscripcion({
          payload: this.inscripcionesForm.getRawValue()
      }))
    }
  }
}

//   public get isEditing(): boolean {
//     return !!this.courseId
//   }

// onSubmit(): void {
//   if (this.inscripcionesForm.invalid) {
//     return this.inscripcionesForm.markAllAsTouched();
//   } else {
//     this.matDialogRef.close(this.inscripcionesForm.value);
//     Swal.fire(
//       '',
//       this.isEditing ? "Estudiante inscripto!" : "Curos agregado correctamente!",
//       'success'
//       )
//     }
//   }
