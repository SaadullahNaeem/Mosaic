import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import { Router } from '@angular/router';

import { FirebaseUISignInSuccess } from 'firebaseui-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

declare var $ :any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})


export class SignupComponent implements OnInit {

  form: FormGroup;

  phoneAuth = false;

  loading = false;

  constructor(private auth: AuthService, private alertService: AlertService,private router: Router,public afAuth: AngularFireAuth, public db: AngularFireDatabase) { }

  ngOnInit() {
    this.form = new FormGroup({
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.pattern("[^ @]*@[^ @]*")]),
      password1: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/)]),
      password2: new FormControl('', Validators.required),
    });
  }

  private makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 25; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }

  save() {
    this.phoneAuth = true;
  }
  
  signupToServer(payload) {
    
    var instance = this;
    
    var rform = this.form;
   
    var service = this.alertService;

    var router = this.router;
    
    var fbAuth = this.afAuth;
    
    this.auth.register(payload).subscribe(function (response) {
      fbAuth.auth.signOut();
      if (response.result) {
        service.success('A Verification link has been sent on your email. Thank You!',true);
        $.getScript('../../../assets/js/plugins/autoclose.js');
        router.navigate(['signin']);
      }
      else {
        var data = response;
        for (var i in data) {
          if (i != 'result') {
            rform.controls[i].setErrors({
              remote: data[i][0]
            });
          }
        }
        instance.phoneAuth = false;
        instance.loading = false;
      }
    });
  }

  successCallback(signInSuccessData: FirebaseUISignInSuccess) {
    var payload = this.form.value    
    payload.username = signInSuccessData.currentUser.uid;
    var instance = this;
    this.loading = true;
    
    this.db.object(signInSuccessData.currentUser.uid).valueChanges().subscribe(function (response) {
      this.unsubscribe();
      if(!response){
        instance.db.object(signInSuccessData.currentUser.uid).set(payload.email);
        instance.signupToServer(payload);
      }
      else{
        instance.afAuth.auth.signOut();
        instance.alertService.error('Phone number already exists');         
        instance.phoneAuth = false;
        instance.loading = false;
      }  
    });
  }
}
