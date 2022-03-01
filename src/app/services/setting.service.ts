import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Setting } from '../models/setting.model';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  settingDoc: AngularFirestoreDocument<Setting>;
  // setting: Observable<Setting>;
  setting: Observable<Setting> = new Observable<Setting>();

  // id unico de la colección

  id = '1';

  constructor(private db: AngularFirestore) { }

  getSetting(): Observable<Setting> {
    this.settingDoc = this.db.doc<Setting>(`configuracion/${this.id}`);
    this.setting = this.settingDoc.valueChanges() as any; /* para que se adapte a cualquier valor*/

    return this.setting;
  }

  modificarSetting(setting: Setting) {
    this.settingDoc = this.db.doc<Setting>(`configuracion/${this.id}`);
    this.settingDoc.update(setting);
  }
}
