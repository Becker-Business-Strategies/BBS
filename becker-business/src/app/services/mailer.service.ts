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
    console.log(user);
    console.log('Recipient: ' + user);





    const body = JSON.stringify(data);
    console.log('BODY: ' + body);

    const headers = new Headers();

    console.log('headers: ' + headers);
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
