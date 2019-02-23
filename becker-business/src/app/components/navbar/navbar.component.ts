import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from "@angular/material";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { LoginComponent } from "../../dialogs/login/login.component";

@Component({
  selector : 'app-navbar',
  templateUrl : './navbar.component.html',
  styleUrls : ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  dialogRef : any;
  username : any;
  password : any;
  user : any;
  color : any;




  constructor(private dialog : MatDialog,
              public authService : AuthService,
              private snackBar : MatSnackBar,
              private router : Router,
              private as : AuthService) {

  }

  ngOnInit() {

    this.as.getProfile().subscribe(profile => {
        this.user = profile.user;
        this.username = this.user.username;
        this.password = this.user.password;
      },
      err => {
        return false;
      });

  }

  onLogoutClick() {
    this.authService.logout();
    this.snackBar.open('YOU ARE NOW LOGGED OUT', 'OK', { duration : 3000 });
    this.router.navigate(['/home']);
    return false;
  }

}
