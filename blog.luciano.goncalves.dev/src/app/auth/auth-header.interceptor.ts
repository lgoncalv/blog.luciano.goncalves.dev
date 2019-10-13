import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { AngularFireAuth } from 'angularfire2/auth';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {
  constructor(private afAuth: AngularFireAuth) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const tokenExpire = localStorage.getItem(environment.constants.jwtTokenKey);
    const isExpired = moment().isAfter(moment.unix(+tokenExpire));

    if (!isExpired) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem(
            environment.constants.jwtTokenKey
          )}`
        }
      });
      return next.handle(request);
    } else {
      return this.afAuth.idToken.pipe(mergeMap(token => {
        localStorage.setItem(environment.constants.jwtTokenKey, token);
        localStorage.setItem(environment.constants.jwtTokenExpKey, moment().add(50, 'minutes').unix().toString())
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
        return next.handle(request);  
      }));
    }
    
  }
}


export const AuthHeaderInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthHeaderInterceptor,
  multi: true,
};