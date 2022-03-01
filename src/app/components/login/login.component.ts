import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { LoginService } from 'src/app/services/login.service';
import { SettingService } from 'src/app/services/setting.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  allowAdd:boolean;

  constructor(private router: Router,
    private flasshMessages: FlashMessagesService,
    private loginService: LoginService,
    private settingService:SettingService) { }

  ngOnInit(): void {
    this.loginService.getAuth().subscribe(auth => {
      if (auth) this.router.navigate(['/']);
    });
    
    this.settingService.getSetting().subscribe((setting :any)=>{
      this.allowAdd=setting.permitirRegistro;
    })
  }

  login() {
    this.loginService.login(this.email, this.password)
      .then(res => {
        this.router.navigate(['/']);
      })
      .catch(error => {
        this.flasshMessages.show(error.messages, { cssClass: 'alert-danger', timeout: 4000 });
      });
  }

}
