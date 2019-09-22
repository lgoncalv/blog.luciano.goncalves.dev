import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private _router: Router,
        private _authService: AuthService
    ) { }
    canActivate(
    ): Observable<boolean> | boolean {
        return this._authService.user$
            .pipe(map(user => {
                if (user && user.uid) {
                    return true;
                } else {
                    this._router.navigate(['/admin/login']);
                    return false;
                }
            }))

    }
}
