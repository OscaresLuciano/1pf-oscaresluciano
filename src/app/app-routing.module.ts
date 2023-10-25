import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthComponent } from './auth/auth.component';
import { AlumnosComponent } from './dashboard/pages/alumnos/alumnos.component';
import { AlumnosDetailComponent } from './dashboard/pages/alumnos/components/alumnos-detail/alumnos-detail.component';

const routes: Routes = [
  {
    path: '', // Ruta raíz
    redirectTo: 'dashboard', // Redirige a 'dashboard'
    pathMatch: 'full' // Asegura que se redirija solo si la URL es exactamente igual a ''
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
      // {
      //   path: 'home',
      //   component: AuthComponent
      // },
      {
        path: 'alumnos/details/:id',
        component: AlumnosDetailComponent
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
