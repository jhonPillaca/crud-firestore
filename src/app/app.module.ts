import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/compat/firestore';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientesComponent } from './components/clients/clientes.component';
import { ClienteComponent } from './components/client/cliente.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ErrorComponent } from './components/error/error.component';
import { FormsModule } from '@angular/forms';
import { AngularFireAuthModule, SETTINGS } from '@angular/fire/compat/auth';
import { FlashMessagesModule } from 'flash-messages-angular';
import { ClientService } from './services/client.service';
import { LoginService } from './services/login.service';
import { SharedModule } from './shared/shared.module';
import { AuthGuard } from './guards/auth.guard';
import { SettingService } from './services/setting.service';

@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    ClienteComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    SettingsComponent,
    ErrorComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firestore, 'control-clientes'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FlashMessagesModule.forRoot(),
    SharedModule
  ],
  providers: [
    ClientService,
    LoginService,
    AuthGuard,
    SettingService,
    {provide:SETTINGS,useValue:{}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
