import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {TokenService} from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              public jwtHelper: JwtHelperService,
              private tokenService: TokenService) { }

  connect(data: any): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/login_check', data);
  }

  public isAuthenticated(): boolean {
    const token = this.tokenService.getToken();

    return !this.jwtHelper.isTokenExpired(token);
  }
}
