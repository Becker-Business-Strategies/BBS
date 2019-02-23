import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  username: any;
  password: any;
  newPassword: any = '';

  constructor( private authService: AuthService, private snackBar: MatSnackBar, private router: Router, private flash: FlashMessagesService) { }
  ngOnInit() {
  }

  onRegisterSubmit(registerform) {
    const admin = {
      username: this.username,
      password: this.password,
      unhashedPassword: this.password,
      newPassword: this.newPassword,
    };

    this.authService.registerAdmin(admin).subscribe(data => {
      if(data.success) {
        this.flash.show('You are now registered and can log in!', {cssClass: 'alert-success'});
        this.router.navigate(['./home']);
      } else {
        this.flash.show(data.msg, {cssClass: 'alert-danger'});

      }
    });

    registerform.reset();
  }

}
