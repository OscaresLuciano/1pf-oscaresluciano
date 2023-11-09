import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlumnosModalComponent } from './components/alumnos-modal/alumnos-modal.component';
import { Alumno } from '../../../core/models';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { AlumnosService } from './alumnos.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss']
})
export class AlumnosComponent {

  alumnos$: Observable<Alumno[]>;

  constructor(
    private alumnosService: AlumnosService,
    private matDialog: MatDialog
  ) {
    
    this.alumnos$ = this.alumnosService.getAlumnos$()
  }
  
  addAlumno() : void {
    this.matDialog.open(AlumnosModalComponent).afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.alumnos$ = this.alumnosService.createAlumnos$({
            id: new Date().getTime(),
            name: result.name,
            lastName: result.lastName,
            email: result.email,
            token: 'asdasd',
            role: 'admin',
          })
        }
      }
    })
  }

  onDeleteAlumno(courseId: number) : void {
    Swal.fire({
      title: 'Confirmar eliminación',
      text: 'Estás seguro de borrar este alumno?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar alumno',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.alumnos$ = this.alumnosService.deleteAlumnos$(courseId);
      }
    });
  }

  onEditAlumno(courseId: number): void {
    this.matDialog
      .open(AlumnosModalComponent, {
        data: courseId,
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (!!result) {
            this.alumnos$ = this.alumnosService.editAlumnos$(courseId, result);
          }
        },
      });
  }

}
