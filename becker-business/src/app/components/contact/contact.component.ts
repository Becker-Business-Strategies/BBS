import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {ValidateService} from "../../services/validate.service";
import {MatSnackBar} from "@angular/material";
import {MailerService} from "../../services/mailer.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  bbs = [
    {
      phone: '314-304-8880',
      name: 'Stephen W. Becker',
      email: 'swbdesk@aol.com'
    }
  ];

  user: any;
  name: String;
  last: String;
  email: String;
  phone: String;
  message: String;
  messageSent: boolean = false;

  constructor(private as: AuthService,
              private vs: ValidateService,
              private snackBar: MatSnackBar,
              private mailer: MailerService) {}

  ngOnInit() {
    this.messageSent = false;
  }

  onRegisterSubmit(register) {

    const client = {
      name: this.name,
      last: this.last,
      email: this.email,
      phone: this.phone,
      message: this.message
    };

    if (!this.vs.validateRegister(client)) {
      this.snackBar.open('Please fill all fields', 'close', {duration: 2000});
      return false;
    }

    // Validate Email

    if (!this.vs.validateEmail(client.email)) {
      this.snackBar.open('Please enter a valid email', 'close', {duration: 2000});
      return false;
    }

    // Register User
    this.as.registerUser(client).subscribe(data => {
      if (data.success) {
        this.snackBar.open('Thank you for reaching out. We will be in touch shortly!', '', {duration: 3000});
        console.log(client);

        this.mailer.newClient(client).subscribe(mail => {
          if (mail.success) {
            console.log('Message sending...');
          }
        });

      } else {
        this.snackBar.open('Something went wrong' , 'TRY AGAIN', {duration: 3000});
        console.log('error: ');
      }
    });


    register.reset();

    this.messageSent = true;


  }

  resetForm() {
this.ngOnInit();
  }
}
