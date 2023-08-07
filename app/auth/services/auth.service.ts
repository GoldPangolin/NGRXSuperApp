import { Credentials, User } from './../models/users';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable, isDevMode } from "@angular/core";
import { Observable, catchError, map, of, switchMap, throwError } from "rxjs";


@Injectable({
    providedIn: 'root',
})
export class AuthService {

    private apiURL = "auth";
    private headers = new HttpHeaders({'Content-Type': 'application/json'});
    
    login(credentials: Credentials): Observable< User> {
        if(isDevMode()){
            if (credentials.username !== 'test' && credentials.username !== 'ngrx') {
                return throwError(() => 'Invalid username or password');
              }
          
              return of({ name: 'User' });
        } else {
            return this._http.post<{ user: User }>(`${this.apiURL}/login`, credentials, {'headers' :this.headers }).pipe(
                map((httpResposne) => httpResposne.user )
            );
        }
    }

    logout(){
        return of(true);
    }

    constructor(private _http: HttpClient,){}
}