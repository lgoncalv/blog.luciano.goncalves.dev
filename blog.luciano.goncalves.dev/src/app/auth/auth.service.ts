import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(private _afAuth: AngularFireAuth) {
    this.user$ = this._afAuth.authState;
  }

  login(email: string, password: string, next: (sucess: boolean) => void) {
    this._afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(_ => {
        this._afAuth.auth.currentUser.getIdToken().then(token => {
          localStorage.setItem(environment.constants.jwtTokenKey, token);
        });
        next(true);
      })
      .catch(error => {
        console.log("auth error", error);
        next(false);
      });
  }

  logout(next: ()=> void) {
    this._afAuth.auth.signOut().then(_ => {
      localStorage.removeItem(environment.constants.jwtTokenKey);
      next();
    });
  }
}