import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private _router: Router,
        private _authService: AuthService,
    ) { }
    
    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | boolean {
        return this._authService.user$
            .pipe(map(user => {
                console.log(user);
                if (user && user.uid) {
                    return true;
                } else {
                    this._router.navigate(['/admin/login'], {
                        queryParams: {
                            return: state.url
                        }
                    });
                    return false;
                }
            }))

    }
}
