import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _router: Router,
    private _authService: AuthService
  ) {}
  canActivate(
    ): Observable<boolean> | boolean {
    return this._authService.user$
    .pipe(map(user=> {
      if(user && user.uid) {
        return true;
      } else {
        this._router.navigate(['/admin/login']);
        return false;
      }
    }))
    
  }
}
