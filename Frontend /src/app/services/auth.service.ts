import { Injectable } from '@angular/core';

import { of } from 'rxjs/observable/of'
import { Observable } from 'rxjs';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { map, tap, catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelper } from 'angular2-jwt';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthService {

  private AUTH_ENDPOINT = 'http://127.0.0.1:8000/rest-auth/';

  private jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http: Http, private cookies: CookieService, public fbAuth: AngularFireAuth) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // Let the app keep running by returning an empty result.
      var error = error.json();
      error.result = false;
      return of(error as T);
    };
  }

  login(payload): Observable<any> {
    return this.http.post(this.AUTH_ENDPOINT + 'login/', payload).pipe(
      map((response: Response) => {
        var data = response.json();
        if (data.token) {
          this.cookies.set('auth_token', data.token, this.jwtHelper.getTokenExpirationDate(data.token));
        }
        return { result: true };
      }),
      catchError(this.handleError('login', []))
    );
  }

  register(payload): Observable<any> {
    return this.http.post(this.AUTH_ENDPOINT + 'registration/', payload).pipe(
      map((response: Response) => {

        return { result: true };
      }),
      catchError(this.handleError('registration', []))
    );
  }

  is_authenticated(): boolean {
    var token = this.cookies.get('auth_token');
    if (token) {
      if (!this.jwtHelper.isTokenExpired(token)) {
        return true;
      }
    }
    return false;
  }

  verify(payload): Observable<any> {
    return this.http.post(this.AUTH_ENDPOINT + 'registration/verify-email/', payload).pipe(
      map((response: Response) => {
        return { result: true };
      }),
      catchError(this.handleError('verification', []))
    );
  }

  reset(payload): Observable<any> {
    return this.http.post(this.AUTH_ENDPOINT + 'password/reset/', payload).pipe(
      map((response: Response) => {
        return { result: true };
      }),
      catchError(this.handleError('Reset', []))
    );
  }
  
  change(payload): Observable<any> {
    return this.http.post(this.AUTH_ENDPOINT + 'password/reset/confirm/', payload).pipe(
      map((response: Response) => {
        return { result: true };
      }),
      catchError(this.handleError('Change', []))
    );
  }

  logout(): Observable<any> {

    return this.http.post(this.AUTH_ENDPOINT + 'logout/', {}).pipe(
      map((response: Response) => {
        this.cookies.deleteAll();
        this.fbAuth.auth.signOut();
        return { result: true };
      }),
      catchError(this.handleError('logout', []))
    );
  }
}


    // var token = this.cookies.get('auth_token');
    // const headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // headers.append('Authorization', 'Token '+token);
    // const options = new RequestOptions({headers: headers});
