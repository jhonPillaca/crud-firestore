import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private authoService: AngularFireAuth) { }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.authoService.signInWithEmailAndPassword(email, password)
        .then(datos => resolve(datos),
          error => reject(error)
        );
    })
  }

  getAuth() {
    return this.authoService.authState.pipe(
      map(auth => auth)
    );
  }

  logout() {
    this.authoService.signOut();
  }

  register(email:string,password:string){
    return new Promise((resolve, reject)=>{
      this.authoService.createUserWithEmailAndPassword(email,password)
      .then(datos=>resolve(datos),
      error=>reject(error))
    });
  }
}
