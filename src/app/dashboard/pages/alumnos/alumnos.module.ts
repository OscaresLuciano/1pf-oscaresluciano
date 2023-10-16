import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlumnosComponent } from './alumnos.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AlumnosModalComponent } from './components/alumnos-modal/alumnos-modal.component';
import { AlumnosTableComponent } from './components/alumnos-table/alumnos-table.component';



@NgModule({
  declarations: [
    AlumnosComponent,
    AlumnosModalComponent,
    AlumnosTableComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    AlumnosComponent
  ]
})
export class AlumnosModule { }
