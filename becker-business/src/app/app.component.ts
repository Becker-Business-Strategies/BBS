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



  constructor() {}



 ngOnInit() {}

}
