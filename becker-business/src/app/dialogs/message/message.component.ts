import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})

export class MessageComponent implements OnInit {

  constructor(private as: AuthService,
              private snackBar: MatSnackBar,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<MessageComponent>,
              @Inject(MAT_DIALOG_DATA)public data: any) {
  }

  user: any;
  name: string;
  last: string;
  phone: string;
  email: string;
  message: string;
  open: boolean = false;


  ngOnInit() {
  }


}
