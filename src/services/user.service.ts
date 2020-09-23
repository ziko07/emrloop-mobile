import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Base} from './base';

@Injectable({
    providedIn: 'root'
})

export class UserService {
    constructor(public http: HttpClient) {
    }

    private userSubject = new Subject<any>();

    listUser(user: any, action = 'new') {
        this.userSubject.next({user, action});
    }

    getUser(): Observable<any> {
        return this.userSubject;
    }

    getSingleUserType(id): Observable<any> {
        return this.http.get(Base.apiUrl + '/users/user_type?user_id=' + id, Base.requestHeader());
    }

    getSingleUser(id): Observable<any> {
        return this.http.get(Base.apiUrl + '/users/get_user/' + id, Base.requestHeader());
    }

    getUsers(page): Observable<any> {
        return this.http.get(Base.apiUrl + '/users?page=' + page, Base.requestHeader());
    }

    addUser(userDetails): Observable<any> {
        return this.http.post(Base.apiUrl + '/users/add_user', {user: userDetails}, Base.requestHeader());
    }

    changeUserType(user_id, type): Observable<any> {
        return this.http.put(Base.apiUrl + '/users/change_user_type?id=' + user_id, {user_id, type}, Base.requestHeader());
    }

    deleteUser(email): Observable<any> {
        return this.http.delete(Base.apiUrl + `/users/delete_user?email=${email}`, Base.requestHeader());
    }

    confirmUser(id): Observable<any> {
        return this.http.post(Base.apiUrl + `/users/confirm_user?id=${id}`, Base.requestHeader());
    }
}
