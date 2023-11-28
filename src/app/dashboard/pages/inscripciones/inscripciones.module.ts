import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscripcionesComponent } from './inscripciones.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { InscripcionesTableComponent } from './components/inscripciones-table/inscripciones-table.component';
import { EffectsModule } from '@ngrx/effects';
import { InscripcionEffects } from './store/inscripcion.effects';



@NgModule({
  declarations: [
    InscripcionesComponent,
    InscripcionesTableComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    EffectsModule.forFeature([InscripcionEffects])
  ],
  exports: [
    InscripcionesComponent
  ]
})
export class InscripcionesModule { }
