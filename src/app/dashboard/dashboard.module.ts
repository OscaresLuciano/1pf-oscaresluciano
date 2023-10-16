import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { SharedModule } from '../shared/shared.module';
import { AlumnosModule } from './pages/alumnos/alumnos.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MatListModule } from '@angular/material/list';



@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AlumnosModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
