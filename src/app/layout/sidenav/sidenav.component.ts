import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "app/shared/security/auth.service";
import { Auth } from "app/shared/security/auth";

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  auth: Auth;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.auth$.subscribe(auth => this.auth = auth);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
