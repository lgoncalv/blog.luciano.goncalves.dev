import * as firebase from "firebase/app";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(private _router: Router, private _afAuth: AngularFireAuth) {
    this.user$ = this._afAuth.authState;
  }

  login(email: string, password: string) {
    this._afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(_ => {
        this._router.navigate(["/post/edit/new"]);
        this._afAuth.auth.currentUser.getIdToken().then(token => {
          localStorage.setItem(environment.constants.jwtTokenKey, token);
        });
      })
      .catch(error => console.log("auth error", error));
  }

  logout() {
    this._afAuth.auth.signOut();
    localStorage.removeItem(environment.constants.jwtTokenKey);
    this._router.navigate([""]);
  }
}
