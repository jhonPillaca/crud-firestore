import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Setting } from 'src/app/models/setting.model';
import { SettingService } from 'src/app/services/setting.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  permitirRegistro = false;

  constructor(private router: Router,
    private settingService: SettingService) { }

  ngOnInit(): void {
    this.settingService.getSetting().subscribe(
      (setting: Setting) => {
        this.permitirRegistro = setting.permitirRegistro ==true ? true:false;

      }
    )
  }


  guardar() {
    let setting = { permitirRegistro: this.permitirRegistro };
    this.settingService.modificarSetting(setting);
    this.router.navigate(['/']);
  }

}
