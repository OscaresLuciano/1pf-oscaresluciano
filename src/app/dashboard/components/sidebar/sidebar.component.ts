import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Usuario } from 'src/app/core/models';
import { selectAuthUser } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  showFiller = false;
  usuarioRol$: Observable<Usuario['role'] | undefined>;
  navItems: string[] = [];

  constructor(
    private authService: AuthService,
    private store: Store,
    ){
    this.usuarioRol$ = this.store.select(selectAuthUser).pipe(map((u) => u?.role));
  }

  logOut(): void {
    this.authService.logOut();
  }

  ngOnInit(): void {
    this.usuarioRol$.subscribe((rol) => {
      if (rol === 'Administrador') {
        this.navItems = ['home', 'cursos', 'usuarios', 'inscripciones'];
      } else {
        this.navItems = ['home', 'cursos', 'inscripciones'];
      }
    });
  }
}
