import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Observable, map } from 'rxjs';
import { Usuario } from 'src/app/core/models';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  showFiller = false;

  navItems = [
    'home', 'cursos', 'alumnos', 'inscripciones'
  ]
  
  authUserObs$: Observable<string>

  constructor(authService: AuthService) {
    this.authUserObs$ = authService.obtenerUsuarioLogueado()
    .pipe(
      map((usuario) => usuario.email.toUpperCase())
    );
  }
}
