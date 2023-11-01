import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthComponent } from './auth/auth.component';
import { AlumnosComponent } from './dashboard/pages/alumnos/alumnos.component';
import { AlumnosDetailComponent } from './dashboard/pages/alumnos/components/alumnos-detail/alumnos-detail.component';
import { CursosComponent } from './dashboard/pages/cursos/cursos.component';
import { CursosDetailComponent } from './dashboard/pages/cursos/components/cursos-detail/cursos-detail.component';
import { InscripcionesComponent } from './dashboard/pages/inscripciones/inscripciones.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'auth',
        component: AuthComponent
      },
      {
        path: 'alumnos',
        component: AlumnosComponent
      },
      {
        path: 'alumnos/details/:id',
        component: AlumnosDetailComponent
      },
      {
        path: 'cursos',
        component: CursosComponent
      },
      {
        path: 'cursos/detail/:id',
        component: CursosDetailComponent,
      },
      {
        path: 'inscripciones',
        component: InscripcionesComponent,
      },
      {
        path: '**',
        component: AuthComponent
      }
    ]
  },
  {
    path: '**',
    component: DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
