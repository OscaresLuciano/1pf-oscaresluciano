import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { InscripcionActions } from './store/inscripcion.actions';
import { MatDialog } from '@angular/material/dialog';
import { InscripcionesModalComponent } from './components/inscripciones-modal/inscripciones-modal.component';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.scss']
})
export class InscripcionesComponent {
  constructor(
      private store: Store,
      private matDialog: MatDialog
    ) {
    this.store.dispatch(InscripcionActions.loadInscripciones());
  }

  addInscripcion(): void
  {
    this.matDialog.open(InscripcionesModalComponent);
  }
}
