import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Inscripcion } from 'src/app/core/models';
import { InscripcionesService } from '../inscripciones/services/inscripciones.service';
import { MatDialog } from '@angular/material/dialog';
import { InscripcionesModalComponent } from './components/inscripciones-modal/inscripciones-modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html'
})
export class InscripcionesComponent {

  inscripciones$: Observable<Inscripcion[]>;

  constructor(
    private inscripcionesService: InscripcionesService,
    private matDialog: MatDialog
  ) {
    this.inscripciones$ = this.inscripcionesService.getInscripciones$()
  }
  
  addInscripcion(): void {
    this.matDialog
      .open(InscripcionesModalComponent)
      .afterClosed()
      .subscribe((v) => {
        if (!!v) {
          this.inscripcionesService.createInscripcion$(v).subscribe(() => {
            this.inscripciones$ = this.inscripcionesService.getInscripciones$();
          });
        }
      });
    }

  onDeleteInscripcion(inscripcionId: number) : void {
    Swal.fire({
      title: 'Confirmar eliminación',
      text: 'Estás seguro de borrar esta inscripción?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar inscripción',
      cancelButtonText: 'Cancelar'
    }).then((v) => {
      if (v.isConfirmed) {
        this.inscripciones$ = this.inscripcionesService.deleteInscripciones$(inscripcionId);
      }
    });
  }

  onEditInscripcion(inscripcion: Inscripcion): void {
    this.matDialog
      .open(InscripcionesModalComponent, {
        data: inscripcion.id,
      })
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (!!v) {
            this.inscripciones$ = this.inscripcionesService.editInscripcion$(inscripcion.id, v)
          }
        },
      });
  }

}
