import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './services/auth.service';

@Injectable()
export class PreventGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService) {}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(! this.auth.is_authenticated()){
        return true;
      }
      this.router.navigate(['']);
    return false;
  }

}
