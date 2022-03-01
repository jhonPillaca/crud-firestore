import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

 isloggedIn:boolean;
  loggedInUser:string;

  allowAdd:boolean;

  constructor(private loginService:LoginService,
              private router:Router) { }

  ngOnInit(): void {
    this.loginService.getAuth().subscribe(
      auth=>{
        if(auth){
          this.isloggedIn=true;
          this.loggedInUser=auth.email!;
          // console.log('datos del usuario',auth);
        }else{
          this.isloggedIn=false;
        }
      }
    )

  }

  logout(){
    this.loginService.logout();
    this.isloggedIn=false;
    this.router.navigate(['/login']);
  }

}
