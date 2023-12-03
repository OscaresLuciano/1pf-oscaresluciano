import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscripcionesComponent } from './inscripciones.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { InscripcionesTableComponent } from './components/inscripciones-table/inscripciones-table.component';
import { EffectsModule } from '@ngrx/effects';
import { InscripcionEffects } from './store/inscripcion.effects';
import { StoreModule } from '@ngrx/store';
import { inscripcionFeature } from './store/inscripcion.reducer';
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
    InscripcionesRoutingModule,
    StoreModule.forFeature(inscripcionFeature),
    EffectsModule.forFeature([InscripcionEffects])
  ],
  exports: [
    InscripcionesComponent
  ]
})
export class InscripcionesModule { }
