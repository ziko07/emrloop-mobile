import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Base} from './base';

@Injectable({
  providedIn: 'root'
})

export class MessageService {
  constructor(public http: HttpClient) { }

  private messageSubject = new Subject<any>();

  listMessage(message: any) {
    this.messageSubject.next(message);
  }

  getMessage(): Observable<any> {
    return this.messageSubject;
  }

  createNewLoop(data): Observable<any> {
    return this.http.post(Base.apiUrl + '/users/messages/publish_message', data, Base.requestHeader());
  }

  sendMessage(data): Observable<any> {
    return this.http.post(Base.apiUrl + '/users/messages/deliver_message', data, Base.requestHeader());
  }
}
