import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { EMPTY, Observable, catchError, switchMap, throwError } from "rxjs";

import { AuthenticationService } from "../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  constructor(private authSrvc: AuthenticationService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401) return this.handle401Error(request, next);

        return throwError(() => new Error(err.error.message));
      })
    );
  }

  private handle401Error(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;

      return this.authSrvc.refreshAccessToken$().pipe(
        switchMap(() => {
          this.isRefreshing = false;

          return next.handle(request);
        }),
        catchError(() => {
          this.isRefreshing = false;
          this.authSrvc.clearSession();

          return EMPTY;
        })
      );
    }

    return next.handle(request);
  }
}
