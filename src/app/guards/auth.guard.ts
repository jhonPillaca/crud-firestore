import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {  CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router:Router,
              private authFire:AngularFireAuth){}

            /* generado por defecto con cli */
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
  
  canActivate():any {
      return this.authFire.authState.pipe(
        map(auth=>{
          if(!auth){
            this.router.navigate(['/login']);
            return false;
          }else{
            return true;
          }
        })
      )
  }
}
