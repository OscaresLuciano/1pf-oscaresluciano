import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Usuario } from 'src/app/core/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  public authUser$: Observable<Usuario | null>

  constructor(private authService: AuthService) {
    this.authUser$ = this.authService.authUser$;
  }

  get fullName$(): Observable<string> {
    return this.authUser$.pipe(
      map((user) => `${user?.name} ${user?.lastName}`)
      );
  }

}
