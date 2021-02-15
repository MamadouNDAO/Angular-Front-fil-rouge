import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {TokenService} from './token.service';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {
  role = "";
  constructor(private tokenService: TokenService,
              private auth: AuthService,
              public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean{
    const expectedRole = route.data.expectedRole;
    const token = this.tokenService.getToken();

    if (token != null){
      this.role = this.tokenService.getRole(token);
    }

    if(!this.auth.isAuthenticated() || this.role != expectedRole)
    {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
