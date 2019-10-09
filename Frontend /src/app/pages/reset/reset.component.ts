import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';
import { Router } from '@angular/router';

declare var $ :any;

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  
  form: FormGroup;

  constructor(private route: ActivatedRoute, private auth: AuthService, private alertService: AlertService, private router: Router) { }
  
  ngOnInit() {
    this.form = new FormGroup({
      new_password1: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/)]),
      new_password2: new FormControl('', Validators.required),
    });
  }

  change(paylaod){
    paylaod.token = this.route.snapshot.paramMap.get('key');
    paylaod.uid = this.route.snapshot.paramMap.get('uid');

    var instance = this;

    this.auth.change(paylaod).subscribe(function (response) {
      if(response.result){
        instance.alertService.success('Password Successfully Changed. Please login to proceed. Thank You!',true);
      }
      else{
        instance.alertService.error('Password Change Failed. Please try again. Thank You!',true);
      }
      $.getScript('../../../assets/js/plugins/autoclose.js');

      instance.router.navigate(['signin']);
    }); 
  }
}
