import { Injectable } from '@angular/core';
import { Http, Headers} from "@angular/http";
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MailerService {

  constructor(private http: Http) { }

  sendEmail(user) {
    console.log('Sending Email: ');
    const data = {user};





    const body = JSON.stringify(data);

    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    // return this.http.post('http://localhost:3000/mailer/resetPassword', body,{ headers: headers})
    return this.http.post('mailer/resetPassword', body,{headers: headers})

      .map(res => res.json());
    // return this.http.post('mailer/resetPassword', body,{headers:headers});


  }


  newClient(client) {


    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // return this.http.post('http://localhost:3000/mailer/newClient', client,{ headers: headers})
    return this.http.post('mailer/newClient', client,{ headers: headers })
      .map(res => res.json());
  }
}
