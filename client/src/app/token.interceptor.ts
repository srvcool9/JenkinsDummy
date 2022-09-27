import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { mergeMap, Observable, retryWhen } from 'rxjs';

import { ClientSideStorageService } from '../app/layouts/shared/services/client-side-storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  localRegistrationPath="http://localhost:4200/#/registration";
  appRegistrationPath="http://184.168.124.155/#/registration"

  path = window.location.href;
  javaToken:any
  constructor(
    private cStorage: ClientSideStorageService,
    private route: Router
  ) {
    
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const loginStatus = JSON.parse(this.cStorage.get('user'));
    let Token = JSON.parse(this.cStorage.get('JavaToken'));
    if(Token!=null || Token!=undefined){
    this.javaToken= Token.data[0]
  }
    if (loginStatus != undefined) {
      const _token = loginStatus.token;
      if(req.url.substring(7,8) == "1"){
        const privateReq = req.clone({
          headers: req.headers.set("Authorization", "Bearer ".concat(_token)),
        });
        return next.handle(privateReq);
      }else
      {
      const javaReq=req.clone({
        headers: req.headers.set("Authorization", "Bearer ".concat(this.javaToken)),
      });
      return next.handle(javaReq);
    }
   } else {
      return next.handle(req);
    }

    // if(this.path=== this.localRegistrationPath || this.path=== this.localRegistrationPath){
    //   const _token = loginStatus.token;
    //   const privateReq = req.clone({
    //     headers: req.headers.set('Authorization', 'Bearer '.concat(_token)),
    //   });
    //   return next.handle(privateReq).pipe(
    //     retryWhen((error) => {
    //       return error.pipe(
    //         mergeMap((error, index) => {
    //           if (error.status == 401) {
    //             this.route.navigate(['./401']);
    //           }
    //           throw error;
    //         })
    //       );
    //     })
    //   );
    // }
    // else if (loginStatus != undefined) {
    //   const _token = loginStatus.token;
    //   const privateReq = req.clone({
    //     headers: req.headers.set('Authorization', 'Bearer '.concat(_token)),
    //   });
    //   return next.handle(privateReq).pipe(
    //     retryWhen((error) => {
    //       return error.pipe(
    //         mergeMap((error, index) => {
    //           if (error.status == 401) {
    //             this.route.navigate(['./401']);
    //           }
    //           throw error;
    //         })
    //       );
    //     })
    //   );
    // } else {
    //   this.route.navigate(['./401']);
    //   return next.handle(req);
    // }
  }
}
