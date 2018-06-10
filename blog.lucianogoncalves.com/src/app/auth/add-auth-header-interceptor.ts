import {
  HttpInterceptor,
  HttpEvent,
  HttpRequest,
  HttpHandler
} from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

export class AddAuthHeaderInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `bearer ${localStorage.getItem(
          environment.constants.jwtTokenKey
        )}`
      }
    });
    return next.handle(request);
  }
}
