import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: any;
  password: any;
  user: any;
  pass: any;
  show: boolean;
  typeChange: String;

  constructor(public authService: AuthService, private snackBar: MatSnackBar, private router: Router) {
  }

  ngOnInit() {
    this.show = false;
    this.typeChange = 'password';
  }

  onLoginSubmit() {

    console.log(this.username);
    console.log(this.password);

    const user = {
      username: this.username,
      password: this.password,
    };

    this.authService.authenticateUser(user).subscribe(data => {
      if (data.success) {
        this.authService.storeUserData(data.token, data.user);
        this.snackBar.open('You are now logged in', 'close', {duration: 5000});
        this.router.navigate(['../../../profile']);

      } else {
        this.snackBar.open(data.msg, 'close', {duration: 5000});
      }
      console.log(data);
    });
  }

  showPassword() {
    console.log(this.show, this.typeChange);
    this.show = !this.show;
    console.log(this.show);
    if (this.show === false) {
      this.typeChange = 'password';
    } else {
      this.typeChange = 'text';
    }
    console.log(this.typeChange);
  }

}
