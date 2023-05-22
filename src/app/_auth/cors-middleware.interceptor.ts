import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import {Observable} from "rxjs";
@Injectable()
export class CorsInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Modify the request to include CORS headers
    const modifiedRequest = request.clone({
      setHeaders: {
        'Access-Control-Allow-Origin': 'https://cliniquesolis.cellardoor.info',
        // Add any other required headers here
      }
    });

    // Pass the modified request to the next interceptor or to the HTTP handler
    return next.handle(modifiedRequest);
  }
}
