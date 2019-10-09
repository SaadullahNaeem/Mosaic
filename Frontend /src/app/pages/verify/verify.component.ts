import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';
import { Router } from '@angular/router';

declare var $ :any;

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})

export class VerifyComponent implements OnInit {

  constructor(private route: ActivatedRoute, private auth: AuthService, private alertService: AlertService, private router: Router) { }

  ngOnInit() {
    var service = this.alertService;
    var router = this.router;
        
    var payload = {
      key : this.route.snapshot.paramMap.get('key')  
    } 
    this.auth.verify(payload).subscribe(function (response) {
      
      if(response.result){
        service.success('Email Verified. Please login to proceed. Thank You!',true);
      }
      else{
        service.error('Email Not Verified. Please try again. Thank You!',true);
      }
      
      $.getScript('../../../assets/js/plugins/autoclose.js');
      
      router.navigate(['signin']);

    });

  }

}
