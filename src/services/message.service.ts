import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Base} from './base';

@Injectable({
  providedIn: 'root'
})

export class MessageService {
  constructor(public http: HttpClient) { }

  createNewLoop(data): Observable<any> {
    return this.http.post(Base.apiUrl + '/users/messages/publish_message', data, Base.requestHeader());
  }

  sendMessage(data): Observable<any> {
    return this.http.post(Base.apiUrl + '/users/messages/deliver_message', data, Base.requestHeader());
  }
}
