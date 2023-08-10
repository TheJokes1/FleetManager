import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the token from your preferred storage (e.g., localStorage, sessionStorage)
    const token = localStorage.getItem('access_token');

    // Clone the request and add the Authorization header with the bearer token
    const authReq = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    // Pass the modified request to the next interceptor or the HTTP handler
    return next.handle(authReq);
  }
}
