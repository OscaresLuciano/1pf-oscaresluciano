import { Component } from '@angular/core';
import { CursosService } from './cursos.service';
import { Observable } from 'rxjs';
import { Curso } from 'src/app/core/models';
import { MatDialog } from '@angular/material/dialog';
import { CursosModalComponent } from './components/cursos-modal/cursos-modal.component';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent {  

  courses$: Observable<Curso[]>;

  constructor(
      private cursosService: CursosService,
      private matDialog: MatDialog
    ) {
    this.courses$ = this.cursosService.getCourses$()
  }

  addCourse() : void {
    this.matDialog.open(CursosModalComponent).afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.courses$ = this.cursosService.createCourse$({
            id: new Date().getTime(),
            name: result.name,
            startDate: result.startDate,
            endDate: result.endDate,
          })
        }
      }
    })
  }

  onDeleteCourse(courseId: number) : void {
    Swal.fire({
      title: 'Confirmar eliminación',
      text: 'Estás seguro de borrar este curso?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar curso',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.courses$ = this.cursosService.deleteCourses$(courseId);
      }
    });
  }

  onEditCourse(courseId: number): void {
    this.matDialog
      .open(CursosModalComponent, {
        data: courseId,
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (!!result) {
            this.courses$ = this.cursosService.editCourse$(courseId, result);
          }
        },
      });
  }
  
}
