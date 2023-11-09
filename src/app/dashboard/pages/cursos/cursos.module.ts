import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosComponent } from './cursos.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { CursosTableComponent } from './components/cursos-table/cursos-table.component';
import { CursosModalComponent } from './components/cursos-modal/cursos-modal.component';
import { CursosDetailComponent } from './components/cursos-detail/cursos-detail.component';
import { CursosRoutingModule } from './cursos-routing.module';



@NgModule({
  declarations: [
    CursosComponent,
    CursosTableComponent,
    CursosModalComponent,
    CursosDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    CursosRoutingModule
  ],
  exports: [
    CursosComponent
  ]
})
export class CursosModule { }
