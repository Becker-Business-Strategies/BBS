import { Component, OnInit, ViewChild } from '@angular/core';
import 'rxjs/add/observable/of';
import {MatDialog, MatMenuTrigger, MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
// import { ConfirmDialogComponent} from '../../dialogs/delete-dialog/confirm-dialog.component';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user.model';
import {AuthService} from '../../services/auth.service';
import {MessageComponent} from '../../dialogs/message/message.component';
import {ConfirmComponent} from 'src/app/dialogs/confirm/confirm.component';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {

  displayedColumns = ['name', 'last', 'email', 'phone', 'actions'];
  dataSource = new MatTableDataSource<User>();
  id: string;
  user: any;
  name: string;
  last: string;
  email: string;
  phone: string;
  message: string;

  users = [];

  dialogRef: any;


  constructor(public dialog: MatDialog,
              private us: UserService,
              private as: AuthService,
              private snackBar: MatSnackBar,
              private router: Router) {
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  ngOnInit() {
    this.us.getUser().subscribe(data => {
      this.dataSource.data = data;
      // console.log(data);
      for (let i = 0; i < data.length; i++) {
        // console.log(data[i]);
        this.users.push(data[i]);
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  onRowClicked(row) {
    this.ngOnInit();
  }

  openMessage(row) {

    // console.log(user, user.name, user.last);
    const dialogRef = this.dialog.open(MessageComponent, {
      width: '85%',
      height: 'auto',
      data: {
        name: row.name,
        last: row.last,
        email: row.email,
        phone: row.phone,
        message: row.message
      }
    });


  }

  deleteUser(_id) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: 'auto',
      height: 'auto',
      data: {
        id: _id,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
      //   this.as.deleteUser(_id)
      //     .subscribe(data => {
      //       if (data.success) {
      //         this.ngOnInit();
      //         this.snackBar.open('User has been deleted', '', {duration: 3000});
      //       } else{
      //         this.snackBar.open('ERROR', '',{duration:2000} )
      //       }
      //     });
      //
    });

    // this.router.navigate(['./admin']);
  }
}



