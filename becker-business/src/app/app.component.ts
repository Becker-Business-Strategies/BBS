import {Component, OnInit} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import {LoginComponent} from './dialogs/login/login.component';
import {AuthService} from './services/auth.service';
import {Router} from '@angular/router';
import {ProfileComponent} from './components/profile/profile.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  dialogRef: any;
  username: any;
  password: any;
  user: any;
  color: any;

  abouts = [
    {
      name: 'History',
      link: 'about'
    },
    {
      name: 'Leadership & Executive',
      link: 'about'
    },
    {
      name: 'Professional',
      link: 'about'
    },
    {
      name: 'Education',
      link: 'about'
    },
    {
      name: 'Personal',
      link: 'about'
    },
  ];
  expertises = [
    {
      name: 'mentoring',
      link: 'expertise'
    },
    {
      name: 'international',
      link: 'expertise'
    },
    {
      name: 'metrics',
      link: 'expertise'
    },
    {
      name: 'strategy',
      link: 'expertise'
    },
    {
      name: 'railroad',
      link: 'expertise'
    },
  ];


  constructor(private dialog: MatDialog,
              public authService: AuthService,
              private snackBar: MatSnackBar,
              private router: Router,
              private as: AuthService) {}



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

  // POPS LOG IN DIALOG

  logIn(): void {

    const dialogRef = this.dialog.open(LoginComponent, {width: '500px'});
    // dialogRef.afterClosed().subscribe(result => {
    //
    // });


  }

  // LOGS ADMIN OUT

  onLogoutClick() {
    this.authService.logout();
    this.snackBar.open('YOU ARE NOW LOGGED OUT', 'OK', {duration: 3000});
    this.router.navigate(['/home']);
    return false;
  }
}
