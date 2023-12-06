import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscripcionesComponent } from './inscripciones.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { InscripcionesTableComponent } from './components/inscripciones-table/inscripciones-table.component';
import { InscripcionesRoutingModule } from './inscripciones.routing.module';
import { InscripcionesModalComponent } from './components/inscripciones-modal/inscripciones-modal.component';



@NgModule({
  declarations: [
    InscripcionesComponent,
    InscripcionesTableComponent,
    InscripcionesModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    InscripcionesRoutingModule
  ],
  exports: [
    InscripcionesComponent
  ]
})
export class InscripcionesModule { }
