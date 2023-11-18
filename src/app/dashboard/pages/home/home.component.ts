import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Usuario } from 'src/app/core/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private authService: AuthService) {}

  usuarioLogueado$: Observable<Usuario | null> = this.authService.authUser$;

}
