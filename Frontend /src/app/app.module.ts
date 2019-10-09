import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';

import {
  AuthMethods,
  AuthProvider,
  AuthProviderWithCustomConfig,
  CredentialHelper,
  FirebaseUIAuthConfig,
  FirebaseUIModule
} from 'firebaseui-angular';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { ErrorComponent } from './pages/error/error.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SigninComponent } from './pages/signin/signin.component';

import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './auth.guard';
import { AuthService } from './services/auth.service';
import { AlertService } from './services/alert.service';
import { AlertComponent } from './directives/alert/alert.component';
import { VerifyComponent } from './pages/verify/verify.component';
import { PreventGuard } from './prevent.guard';
import { ResetComponent } from './pages/reset/reset.component';
import { LandingComponent } from './core/landing/landing.component';

const firebaseUiAuthConfig: FirebaseUIAuthConfig = {
  providers: [
    AuthProvider.Phone
  ],
  method: AuthMethods.Popup,
  credentialHelper: CredentialHelper.AccountChooser
};

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig)
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    ErrorComponent,
    SignupComponent,
    SigninComponent,
    VerifyComponent,
    ResetComponent,
    LandingComponent,
  ],
  providers: [
    AuthGuard,
    AuthService,
    CookieService,
    AlertService,
    PreventGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
