import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlumnosComponent } from './alumnos.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AlumnosModalComponent } from './components/alumnos-modal/alumnos-modal.component';
import { AlumnosTableComponent } from './components/alumnos-table/alumnos-table.component';
import { AlumnosDetailComponent } from './components/alumnos-detail/alumnos-detail.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AlumnosComponent,
    AlumnosModalComponent,
    AlumnosTableComponent,
    AlumnosDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
  ],
  exports: [
    AlumnosComponent
  ]
})
export class AlumnosModule { }
