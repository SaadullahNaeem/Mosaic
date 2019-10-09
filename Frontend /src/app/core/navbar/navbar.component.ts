import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
	public today: number = Date.now();

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  logout(){
    var router = this.router;
    this.auth.logout().subscribe(function (response) {
      router.navigate(['signin']);
    });
  }
}
