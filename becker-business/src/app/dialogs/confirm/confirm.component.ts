import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {AuthService} from '../../services/auth.service';


@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  constructor(private as: AuthService,
              private snackBar: MatSnackBar,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<ConfirmComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
  }

  confirmDelete() {
    this.as.deleteUser(this.data.id)
      .subscribe(data => {
        if (data.success) {
          this.ngOnInit();
          this.dialog.closeAll();
          this.snackBar.open('User has been deleted', '', {duration: 3000});
        } else {
          this.snackBar.open('ERROR' + data.msg, '', {duration: 2000});
        }
      });


  }

  close() {
    this.dialog.closeAll();
  }
}
