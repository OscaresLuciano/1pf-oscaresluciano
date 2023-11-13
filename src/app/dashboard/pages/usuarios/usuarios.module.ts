import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsuariosModalComponent } from './components/usuarios-modal/usuarios-modal.component';
import { UsuariosTableComponent } from './components/usuarios-table/usuarios-table.component';
import { UsuariosDetailComponent } from './components/usuarios-detail/usuarios-detail.component';
import { RouterModule } from '@angular/router';
import { UsuariosRoutingRoutingModule } from './usuarios-routing.module';



@NgModule({
  declarations: [
    UsuariosComponent,
    UsuariosModalComponent,
    UsuariosTableComponent,
    UsuariosDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    UsuariosRoutingRoutingModule
  ],
  exports: [
    UsuariosComponent
  ]
})
export class UsuariosModule { }
