import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Base } from './base';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  constructor(public http: HttpClient) { }

  private groupSubject = new Subject<any>();

  public listGroup(group: any) {
    this.groupSubject.next(group);
  }

  public getGroup(): Observable<any> {
    return this.groupSubject;
  }

  public getGroups(page): Observable<any> {
    return this.http.get(Base.apiUrl + '/group?page=' + page, Base.requestHeader());
  }

  public getAllInfo(): Observable<any> {
    return this.http.get(Base.apiUrl + '/group/great_group', Base.requestHeader());
  }

  public joinGroup(group_name): Observable<any> {
    return this.http.post(Base.apiUrl + '/group/join_group', { group_name }, Base.requestHeader());
  }

  public addUserToGroup(group_name, user_uid): Observable<any> {
    return this.http.post(Base.apiUrl + '/group/add_user', { group_name, user_uid }, Base.requestHeader());
  }

  public leaveGroup(group_name): Observable<any> {
    return this.http.post(Base.apiUrl + '/group/leave_group', { group_name }, Base.requestHeader());
  }

  public createGroup(group_name, client_id): Observable<any> {
    return this.http.post(Base.apiUrl + '/group/create_group', { group_name, client_id }, Base.requestHeader());
  }
}
