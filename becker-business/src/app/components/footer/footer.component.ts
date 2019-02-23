import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from "@angular/material";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { LoginComponent } from "../../dialogs/login/login.component";

@Component({
  selector : 'app-footer',
  templateUrl : './footer.component.html',
  styleUrls : ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  dialogRef : any;
  username : any;
  password : any;
  user : any;
  color : any;

  abouts = [
    {
      name : 'History',
      link : 'about'
    },
    {
      name : 'Leadership & Executive',
      link : 'about'
    },
    {
      name : 'Professional',
      link : 'about'
    },
    {
      name : 'Education',
      link : 'about'
    },
    {
      name : 'Personal',
      link : 'about'
    },
  ];
  expertises = [
    {
      name : 'mentoring',
      link : 'expertise'
    },
    {
      name : 'international',
      link : 'expertise'
    },
    {
      name : 'metrics',
      link : 'expertise'
    },
    {
      name : 'strategy',
      link : 'expertise'
    },
    {
      name : 'railroad',
      link : 'expertise'
    },
  ];


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

  logIn() : void {
    const dialogRef = this.dialog.open(LoginComponent, { width : '500px' });

  }


}
