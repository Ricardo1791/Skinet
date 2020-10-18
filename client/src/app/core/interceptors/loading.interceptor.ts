import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';
import { BusyService } from '../services/busy.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
    constructor(private busyservice: BusyService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.url.includes('emailexists')){
            this.busyservice.busy();
        }
        return next.handle(req).pipe(
            delay(1000),
            finalize(() => {
                this.busyservice.idle();
            })
        );
    }
}
