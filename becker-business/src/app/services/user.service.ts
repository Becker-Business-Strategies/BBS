import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user.model';
import {Observable} from 'rxjs';

@Injectable()
export class UserService {

  // private serviceUrl = 'http://localhost:3000/users/users';
  // private DjsURL = 'http://localhost:3000/users/djs';
  // private shiftUrl='http://localhost:3000/shifts/shifts';

  private serviceUrl = 'users/users';


  constructor(private http: HttpClient) { }



  getUser(): Observable<User[]> {
    return this.http.get<User[]>(this.serviceUrl);
  }
}
