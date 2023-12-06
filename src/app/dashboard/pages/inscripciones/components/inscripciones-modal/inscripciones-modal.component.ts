import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InscripcionesService } from '../../services/inscripciones.service';
import { Observable, map, of, switchMap } from 'rxjs';
import { Curso, Inscripcion, Usuario } from 'src/app/core/models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inscripciones-modal',
  templateUrl: './inscripciones-modal.component.html'
})
export class InscripcionesModalComponent {

  cursoOptions$!: Observable<Curso[]>;
  estudianteOptions$!: Observable<Usuario[]>;

  courseIdControl = new FormControl<number | null>(null,[Validators.required]);
  userIdControl = new FormControl<number | null>(null,[Validators.required]);

  inscripcionesForm = new FormGroup({
    courseId: this.courseIdControl,
    userId: this.userIdControl,
  })

  constructor(
    private matDialogRef: MatDialogRef<InscripcionesModalComponent>,
    private inscripcionesService: InscripcionesService,
    @Inject(MAT_DIALOG_DATA) private inscripcionId?: number,
    ) {}

    ngOnInit(): void {
      this.inscripcionesService.getInscripcionDialogOptions$().subscribe({
        next: (options) => {
          this.cursoOptions$ = of(options.cursos);
          this.estudianteOptions$ = of(options.estudiantes);
  
          if (this.inscripcionId) {
            this.inscripcionesService.getInscripcionById$(this.inscripcionId).subscribe({
              next: (c) => {
                if (c) {
                  this.inscripcionesForm.patchValue(c);
                }
              }
            });
          }
        }
      });
    }

    public get isEditing(): boolean {
      return !!this.inscripcionId
    }

    onSubmit(): void {
      if (this.inscripcionesForm.invalid) {
        return this.inscripcionesForm.markAllAsTouched();
      } else {
        const inscripcionPayload = this.inscripcionesForm.value as Inscripcion;
        
        this.inscripcionesService.getInscripciones$().pipe(
          map(inscripciones => inscripciones.find(
            inscripcion => inscripcion.courseId === inscripcionPayload.courseId && inscripcion.userId === inscripcionPayload.userId
          )),
          switchMap(existingInscripcion => {
            if (existingInscripcion) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "El usuario seleccionado ya está inscripto!",
              });
              return of(null);
            } else {
              return this.inscripcionesService.createInscripcion$(inscripcionPayload);
            }
          })
        ).subscribe((result) => {
          if (result !== null) {
            this.matDialogRef.close(result);
          }
        });
      }
    }
}