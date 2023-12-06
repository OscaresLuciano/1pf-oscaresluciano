import { Injectable } from '@angular/core';
import { Observable, concatMap, map, of } from 'rxjs';
import { Inscripcion, Usuario } from '../../../../core/models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.local';
import * as SharedHelpers from '../../../../shared/helpers';

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
    const randomToken = SharedHelpers.generateRandomString(20);
    const payloadWithToken = { ...payload, token: randomToken };
    return this.httpClient
      .put<Usuario>(`${environment.baseUrl}/users/${usuarioId}`, payloadWithToken)
      .pipe(concatMap(() => this.getUsuarios$()))
  }

  getUsuarioWithInscripciones$(usuarioId: number): Observable<{ usuario: Usuario | undefined, inscripciones: Inscripcion[] }> {
    return this.getUsuarioById$(usuarioId).pipe(
      concatMap((usuario: Usuario | undefined) => {
        if (usuario) {
          return this.httpClient.get<Inscripcion[]>(`${environment.baseUrl}/enrollments?userId=${usuarioId}&_expand=course&_expand=user`).pipe(
            map((inscripciones: Inscripcion[]) => ({ usuario, inscripciones }))
          );
        } else {
          return of({ usuario: undefined, inscripciones: [] });
        }
      })
    );
  }

  getUsuarioById$(usuarioId: number): Observable<Usuario | undefined> {
    return this.httpClient
      .get<Usuario>(`${environment.baseUrl}/users/${usuarioId}`);
  }
  
}
