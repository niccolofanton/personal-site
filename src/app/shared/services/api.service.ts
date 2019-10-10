import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { PATH } from 'src/environments/environment';
import { tap, delay } from 'rxjs/operators';
import { HttpInterceptor, HttpClient, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class ApiService implements HttpInterceptor {

  public isRequesting = false;

  constructor(
    private _http: HttpClient,
    private _authService: AuthenticationService,
    private _message: MessageService
  ) { }

  // Interceptor method
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // check only external calls
    if (req.url.includes(PATH)) {
      this._message.showLoading();
      req = req.clone({ setHeaders: { Authorization: `Bearer ${this._authService.getToken()}` } });
    }

    return next.handle(req)
      .pipe(
        delay(3000),
        tap(
          (event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              this._message.closeLoading();
            }
          },
          (err: any) => {
            this._message.closeLoading();
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401) { }
            }
          })
      );

  }

}
