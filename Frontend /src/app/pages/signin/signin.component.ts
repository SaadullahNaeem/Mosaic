import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { inspect } from 'util';
import { AlertService } from '../../services/alert.service';
import { FirebaseUISignInSuccess } from 'firebaseui-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

declare var $: any;

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  form: FormGroup;

  remindform: FormGroup;

  constructor(private auth: AuthService, private router: Router, private alert: AlertService, public afAuth: AngularFireAuth, public db: AngularFireDatabase) {}

  signinTab = true;

  phoneAuth = false;

  loading = false;

  ngOnInit() {

    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern("[^ @]*@[^ @]*")]),
      password: new FormControl('', Validators.required),
    });

    this.remindform = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern("[^ @]*@[^ @]*")]),
    });

    var instance = this;

    $('#forgetPassword').on('click', function (e) {
      instance.signinTab = false;
      e.preventDefault();
      $('.form-signin').slideUp(300, function () {
        $('.form-password').slideDown(300);
      });
    });

    $('#signinPassword').on('click', function (e) {
      instance.signinTab = true;
      e.preventDefault();
      $('.form-password').slideUp(300, function () {
        $('.form-signin').slideDown(300);
      });
    });

  }

  save() {
    this.phoneAuth = true;
  }
  
  revert() {
    this.phoneAuth = false;
    this.afAuth.auth.signOut();
    this.loading = false;
    this.form.controls.password.setErrors({
      remote: 'Unable to login with Provided Credentials'
    });
  }

  private signinToServer(uid) {
    var lform = this.form;
    var router = this.router;
    var fbAuth = this.afAuth;
    var instance = this;
    
    var payload = {
      username:uid,
      password:lform.value.password
    };

    this.auth.login(payload).subscribe(function (response) {
      if (response.result) {
        router.navigate(['dashboard']);
      }
      else {
        fbAuth.auth.signOut();
        instance.phoneAuth = false;
        instance.loading = false;
        var errors = response.non_field_errors;
        if (errors.length > 0)
          lform.controls.password.setErrors({
            remote: errors[0]
          });
      }
    });
  }

  successCallback(signInSuccessData: FirebaseUISignInSuccess) {
    var lform = this.form;
    var instance = this;
    this.loading = true;

    this.db.object(signInSuccessData.currentUser.uid).valueChanges().subscribe(function (response) {
      this.unsubscribe();
      if(response === lform.value.email){
        instance.signinToServer(signInSuccessData.currentUser.uid);
      }
      else {
        instance.revert();
      }
    });
  }



  remind(payload) {
    var instance = this;

    this.auth.reset(payload).subscribe(function (response) {
      setTimeout(function () {
        if (response.result) {
          $('.form-password').slideUp(300, function () {
            $('.form-signin').slideDown(300);
          });
          instance.alert.success('A Confirmation Email has been sent. Please open and follow the requirements. Thank you')
        }
        else {
          instance.alert.error('A Confirmation Email can not be sent. Please try again. Thank you')
        }
        instance.signinTab = true;

      }, 1000);

    });
  }

}
