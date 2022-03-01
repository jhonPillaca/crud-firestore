import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {  CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SettingService } from '../services/setting.service';

@Injectable({
  providedIn: 'root'
})
export class SettingGuard implements CanActivate {

  constructor (
    private router:Router,
    private afAuth:AngularFireAuth,
    private settingService:SettingService
  ){}
  canActivate():Observable<boolean> {
    return this.settingService.getSetting().pipe(
      map(setting  => {
        if(setting.permitirRegistro){
          return true;
        }
        else{
          this.router.navigate(['/login']);
          return false;
        }
      })
    )
    
  }
  
}
