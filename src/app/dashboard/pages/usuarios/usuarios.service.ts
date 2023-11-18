import { Injectable } from '@angular/core';
import { Observable, concatMap } from 'rxjs';
import { Usuario } from '../../../core/models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.local';
import * as SharedHelpers from '../../../shared/helpers';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  usuarios: Usuario[] = []

  constructor(
    private httpClient: HttpClient,
  ) { }
  
  getUsuarios$(): Observable<Usuario[]> {
    return this.httpClient
      .get<Usuario[]>(`${environment.baseUrl}/users`);
  }

  createUsuarios$(payload: Usuario): Observable<Usuario[]> {
    const randomToken = SharedHelpers.generateRandomString(20);
    const payloadWithToken = { ...payload, token: randomToken };
    return this.httpClient
      .post<Usuario>(`${environment.baseUrl}/users`, payloadWithToken)
      .pipe(concatMap(() => this.getUsuarios$()))
  }

  deleteUsuarios$(usuarioId: number): Observable<Usuario[]> {
    return this.httpClient
      .delete<Usuario>(`${environment.baseUrl}/users/${usuarioId}`)
      .pipe(concatMap(() => this.getUsuarios$()))
  }

  editUsuarios$(usuarioId: number, payload: Usuario): Observable<Usuario[]> {
    return this.httpClient
      .put<Usuario>(`${environment.baseUrl}/users/${usuarioId}`, payload)
      .pipe(concatMap(() => this.getUsuarios$()))
  }

  getUsuarioById$(usuarioId: number): Observable<Usuario | undefined> {
    return this.httpClient
      .get<Usuario>(`${environment.baseUrl}/users/${usuarioId}`);
  }
  
}
