import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { DashboardComponent } from "./dashboard.component";
import { adminGuard } from "../core/guards/admin.guard";

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full',
            },
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'usuarios',
                canActivate: [adminGuard],
                loadChildren: () => import('./pages/usuarios/usuarios.module')
                .then((m) => m.UsuariosModule)
            },
            {
                path: 'cursos',
                loadChildren: () => import('./pages/cursos/cursos.module')
                .then((m) => m.CursosModule)
            },
            {
                path: 'inscripciones',
                loadChildren: () => import('./pages/inscripciones/inscripciones.module')
                .then((m) => m.InscripcionesModule)
            },
            {
                path: '**',
                redirectTo: 'home'
            }
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule],
})

export class DashboardRoutingModule {}