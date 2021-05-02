import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { AuthResponse, Usuario } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;
  private _usuario!: Usuario;

  get usuario() {
    return { ...this._usuario };
  }

  constructor(private http: HttpClient) {}

  registro(jsonUsuario: object) {
    const url = `${this.baseUrl}/usuario/addUser`;

    return this.http.post<AuthResponse>(url, jsonUsuario).pipe(
      tap(({ codRes, token }) => {
        console.log('salida', codRes);
        if (codRes == '00') {
          localStorage.setItem('token', token!);
        }
      }),
      map((resp) => resp.codRes),
      catchError((err) => of(err.error.msg))
    );
  }

  login(documento: string, password: string) {
    const url = `${this.baseUrl}/usuario/login`;
    const body = { documento, password };

    return this.http.post<AuthResponse>(url, body).pipe(
      tap((resp) => {
        if (resp.codRes == '00') {
          localStorage.setItem('token', resp.token!);
        }
      }),
      map((resp) => resp),
      catchError((err) => of(err.error.msg))
    );
  }

  validarToken() {
    const url = `${this.baseUrl}/usuario/renew`;
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );

    return this.http
      .get<AuthResponse>(url, { headers })
      .pipe(
        map((resp) => {
          localStorage.setItem('token', resp.token!);
          this._usuario = {
            nombre: resp.nombre!,
            documento: resp.documento!,
          };
          return true;
        }),
        catchError((err) => of(false))
      );
  }

  logaout() {
    localStorage.clear();
  }
}
