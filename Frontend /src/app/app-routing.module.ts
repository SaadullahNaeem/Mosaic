import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorComponent } from './pages/error/error.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SigninComponent } from './pages/signin/signin.component';
import { VerifyComponent } from './pages/verify/verify.component';
import { ResetComponent } from './pages/reset/reset.component';
import { LandingComponent } from './core/landing/landing.component';


import { AuthGuard } from './auth.guard';
import { PreventGuard } from './prevent.guard';

const routes: Routes = [

  { path: 'dashboard', loadChildren: 'app/home.module#HomeModule' ,canActivateChild:[AuthGuard]},

  { path: '', component: LandingComponent ,canActivate:[PreventGuard]},
  
  { path: 'signup', component: SignupComponent ,canActivate:[PreventGuard]},

  { path: 'signin', component: SigninComponent ,canActivate:[PreventGuard] },

  { path: 'verify/:key', component: VerifyComponent ,canActivate:[PreventGuard]},
  
  { path: 'password-reset/confirm/:uid/:key', component: ResetComponent ,canActivate:[PreventGuard]},
  
  { path: '**', component: ErrorComponent },
  
  { path: '', redirectTo: '', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
