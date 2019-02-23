import {Component, Inject, OnInit} from '@angular/core';
import {ErrorStateMatcher, MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {MailerService} from '../../services/mailer.service';
import {ValidateService} from '../../services/validate.service';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {AuthService} from "../../services/auth.service";
import {message} from "aws-sdk/clients/sns";


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.scss']
})
export class ResetPassComponent implements OnInit {

  id: any;
  user: any;
  username: String;
  password: any;
  newPassword: any;
  sendReset: boolean = false;
  mail: any;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(private as: AuthService,
              private snackBar: MatSnackBar,
              public dialog: MatDialog,
              public vs: ValidateService,
              public dialogRef: MatDialogRef<ResetPassComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  close() {
    this.dialog.closeAll();
  }

  sendEmail() {
    const userData = this.data.user;
    const id = userData._id;
    const user = {
      username: userData.username,
      email: this.mail,
    };
    this.as.updatePassword(id, user).subscribe(data => {
      if (data.success) {
        this.ngOnInit();
        this.snackBar.open(data.message, '', {duration: 2000});

        this.sendReset = true;
      } else {
        this.snackBar.open('SOMETHING WENT WRONG', 'TRY AGAIN', {duration: 2000});
      }
    });

  }

}
