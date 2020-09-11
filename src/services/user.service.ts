import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Base } from './base';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(public http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(Base.apiUrl + '/users', Base.requestHeader());
  }

  addUser(userDetails): Observable<any> {
    return this.http.post(Base.apiUrl + '/users/add_user', { user: userDetails }, Base.requestHeader());
  }

  changeUserType(user_id, type): Observable<any> {
    return this.http.put(Base.apiUrl + '/users/change_user_type', {user_id, type}, Base.requestHeader());
  }

  deleteUser(email): Observable<any> {
    return this.http.delete(Base.apiUrl + `/users/delete_user?email=${email}`, Base.requestHeader());
  }
}
