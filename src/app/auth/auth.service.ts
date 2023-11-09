import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Usuario } from '../core/models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.local';
import { LoginPayload } from '../core/models';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private _authUser$ = new BehaviorSubject<Usuario | null>(null);
  public authUser$ = this._authUser$.asObservable();

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    ) { }

// json-server db.json --watch
  
  login(payload: LoginPayload): void {
    const headers = new HttpHeaders({
      'token': localStorage.getItem('token') || 'NO HAY TOKEN',
    })

    this.httpClient
    .get<Usuario[]>(
      `${environment.baseUrl}/users?email=${payload.email}&password=${payload.password}`,
      {
        headers: headers,
      }
      )
    .subscribe({

      next: (response) => {
        if(!response.length) {
          alert('invalido')
        } else {
          const authUser = response[0];
          this._authUser$.next(authUser);
          localStorage.setItem('token', authUser.token);
          this.router.navigate(['/dashboard/home'])
        }
      },
      error: (err) => {
        alert('Error de conexión');
      }
    });
  }

  verifyToken(): Observable<boolean> {
    return this.httpClient
    .get<Usuario[]>(
      `${environment.baseUrl}/users?token=${localStorage.getItem('token')}`
      )
      .pipe(
        map((usuarios) => {
          if(!usuarios.length) {
            return false;
          } else {
            const authUser = usuarios[0];
            this._authUser$.next(authUser);
            localStorage.setItem('token', authUser.token);
            return true;
          }
        })
      )
  }

  logOut(): void {
    Swal.fire({
      title: "Estás seguro?",
      text: "Estás por cerrar sesión",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, cerrar sesión.",
    }).then((result) => {
      if (result.isConfirmed) {
        this._authUser$.next(null);
        localStorage.removeItem('token');
        this.router.navigate(['/auth/login']);
      }
    });
  }

}
