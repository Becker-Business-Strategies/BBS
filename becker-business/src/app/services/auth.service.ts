import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import {map} from 'rxjs/operators';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: Http, public jwtHelper: JwtHelper) { }

  // CREATE

  registerUser(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // return this.http.post('http://localhost:3000/users/register', user, {headers: headers})
    return this.http.post('users/register', user, {headers: headers})
      .pipe(map(res => res.json()));
  }
  //
  registerAdmin(admin) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // return this.http.post('http://localhost:3000/admins/register', admin, {headers: headers})
    return this.http.post('admins/register', admin, {headers: headers})
      .pipe(map(res => res.json()));
  }
  // READ

  getProfile() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    // return this.http.get('http://localhost:3000/admins/profile', {headers: headers})
    return this.http.get('admins/profile', {headers: headers})
      .pipe(map(res => res.json()));
  }

  getClientList() {
    // return this.http.get('http://localhost:3000/users/usersList')
    return this.http.get('users/usersList')

      .pipe(map(res => res.json()));
  }
  // UPDATE

  updateUser(id, body) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // return this.http.put('http://localhost:3000/admins/update/' + id, body,{ headers: headers})
    return this.http.put('admins/update/' + id, body,{ headers: headers})
      .map(res => res.json());
  }
  updatePassword(id, body) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // return this.http.put('http://localhost:3000/admins/resetPassword/' + id, body,{ headers: headers})
    return this.http.put('admins/resetPassword/' + id, body,{ headers: headers})
      .map(res => res.json());
  }

  // DELETE
  deleteUser(id) {
    // return this.http.delete('http://localhost:3000/users/user/' + id)
    return this.http.delete('users/user/' + id)
      .pipe(map(res => res.json()));
  }

  // AUTH

  authenticateUser(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // return this.http.post('http://localhost:3000/admins/authenticate', user, {headers: headers})
    return this.http.post('admins/authenticate', user, {headers: headers})
      .pipe(map(res => res.json()));
  }


  isAuthenticated(): boolean {
    const token = localStorage.getItem('id_token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
