import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

const TOKEN_KEY = 'auth-token';
@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private decodedToken: any;
  constructor() { }
  public saveToken(key: string, value: string): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, value);
  }

  public getToken(): any {
    return localStorage.getItem(TOKEN_KEY);
  }
  public removeToken(key: string): any{
    return localStorage.removeItem(TOKEN_KEY);
  }

  decodeToken(token: string): string {
    return jwt_decode(token);
  }
  getRole(token: string): string {
    this.decodedToken = jwt_decode(token);
    return  this.decodedToken.roles;
  }
  getUsername(token: string): string {
    this.decodedToken = jwt_decode(token);
    return  this.decodedToken.username;
  }
  getExpiryTime(token: string): any {
    this.decodedToken = jwt_decode(token);
    return  this.decodedToken.exp;
  }
  getDecodedToken(token: string): any {
    this.decodedToken = jwt_decode(token);
    return  this.decodedToken;
  }
}
