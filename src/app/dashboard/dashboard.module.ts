import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MatListModule } from '@angular/material/list';

import { SharedModule } from '../shared/shared.module';
import { HomeModule } from './pages/home/home.module';
import { DashboardRoutingModule } from './dashboard-routing.module';


@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    ToolbarComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeModule,

    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    DashboardRoutingModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
