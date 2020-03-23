import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Base} from './base';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    api_url = Base.api_url;
    isLoggedIn: boolean;

    constructor(public http: HttpClient) {}


    public login(userDetails): Observable<HttpResponse<any>> {
        return this.http.post<any>(this.api_url + '/auth/sign_in', userDetails, {observe: 'response'});
    }

    public getAuthToken() {
        let auth = JSON.parse(window.localStorage.getItem('auth'));
        return auth ? auth.auth_token : '';
    }

    private requestHeader() {
        return {headers: {Authorization: `Bearer ${this.getAuthToken()}`}};
    }
}
