import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {MatDialog, MatSnackBar} from "@angular/material";
import {ResetPassComponent} from "../../dialogs/reset-pass/reset-pass.component";
import {AppComponent} from "../../app.component";
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  id: any;
  user: any;
  username: String;
  password: any;
  email: any;
  newUsername: any;

  newPassword: any;
  verifyPassword: any;

  editPassword: boolean = false;
  editUsername: boolean = false;
  saveUsername: boolean = false;
  savePassword: boolean =false;
  show: boolean = false;

  constructor(public authService: AuthService,
              public flash: FlashMessagesService,
              public snackBar: MatSnackBar,
              public dialog: MatDialog,
              public app: AppComponent) { }

  ngOnInit() {

    this.app.ngOnInit();


    // GET PROFILE

    this.authService.getProfile().subscribe(profile => {
        this.user = profile.user;
        this.username = this.user.username;
        this.password = this.user.password;
        this.id = profile.user._id;
        // console.log(this.id);
      },
      err => {
        return false;
      });
  }

  updateUsername() {


    this.user.username = this.newUsername;


    this.authService.updateUser(this.id, this.user)
      .subscribe(data => {
        if (data.success) {
          this.snackBar.open('Username has been updated!', 'OK',{duration: 3000});
          this.ngOnInit();
          this.changeUsername();
        } else {
          this.snackBar.open('SOMETHING WENT WRONG -- ' + data.msg, 'OK',{duration: 3000});
        }
  });
  }

  sendEmail(user) {

    this.dialog.open(ResetPassComponent,
      {
        width: 'auto',
        height: 'auto',
        data: {user: this.user}
      });
    this.changePassword();
  }

  updatePassword(password) {

    const id = this.user._id;

    if (this.newPassword !== this.verifyPassword) {
      this.snackBar.open('Passwords do not match', '',{duration: 3000});
    } else {
      this.user.password = this.verifyPassword;
      const user = {
        username: this.username,
        password: this.user.password
      };
      // console.log(user);

      this.authService.updatePassword(id, user).subscribe(data => {
        if (data.success) {
          this.snackBar.open('Password has been updated!', 'LOG IN',{duration: 3000 });
          this.changePassword();
        } else {
          this.snackBar.open('Something went wrong: ' + data.msg, '',{duration: 3000});

        }
      });
      password.reset();
    }
  }


  changeUsername() {
    this.editUsername = !this.editUsername;
    this.saveUsername = !this.saveUsername;
  }
  changePassword() {
    this.editPassword = !this.editPassword;
    this.savePassword = !this.savePassword;
  }

}
