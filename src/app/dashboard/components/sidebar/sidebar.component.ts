import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  showFiller = false;

  constructor(private authService: AuthService){}

  logOut(): void {
    this.authService.logOut();
  }
  
  navItems = [
    'home', 'cursos', 'alumnos', 'inscripciones'
  ]
}
