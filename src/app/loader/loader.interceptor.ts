import { Injectable } from '@angular/core';
import {
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from './loader.service';
import { SpinnerService } from '@accubits/spinner';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];

  constructor(
    private loaderService: LoaderService,
    private spinner: SpinnerService
  ) { }

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    this.loaderService.isLoading.next(this.requests.length > 0);

    if(this.requests.length > 0) {
      this.spinner.show();
    } else {
      this.spinner.hide();
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.requests.push(req);
    this.loaderService.isLoading.next(true);
    this.spinner.show();
    return Observable.create(observer => {
      const subscription = next.handle(req)
        .subscribe(
        event => {
          if (event instanceof HttpResponse) {
            this.removeRequest(req);
            observer.next(event);
          }
        },
        err => { this.removeRequest(req); observer.error(err); },
        () => { this.removeRequest(req); observer.complete(); });
      return () => {
        this.removeRequest(req);
        subscription.unsubscribe();
      };
    });
  }
}
