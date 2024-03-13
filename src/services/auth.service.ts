import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Base } from './base';
// import { AngularTokenService } from 'angular-token';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    authState = new BehaviorSubject(false);

    constructor(public http: HttpClient) {
    }

    private profileSubject = new Subject<any>();

    public listProfile(user: any) {
        this.profileSubject.next(user);
    }

    public getProfile(): Observable<any> {
        return this.profileSubject;
    }

    getAccessTokensFromResponse(resp: any): any {
        return {
            'access-token': resp.headers.get('access-token'),
            'expiry': resp.headers.get('expiry'),
            'uid': resp.headers.get('uid'),
            'client': resp.headers.get('client')
        };
    }

    getRequestObserver(): any {
        return { observe: 'response' };
    }

    storeAccessTokens(access_tokens: any) {
        localStorage.setItem('AUTH', JSON.stringify(access_tokens));
        this.authState.next(true);
    }

    getAccessTokens() {
        return JSON.parse(localStorage.getItem('AUTH'));
    }

    getRequestHeader(): any {
        return { headers: this.getAccessTokens() };
    }

    public login(userDetails): Observable<any> {
        // return this.tokenService.signIn(userDetails);
        return this.http.post(Base.apiUrl + '/auth/sign_in', userDetails, this.getRequestObserver());
    }

    public logout(): Observable<any> {
        // return this.tokenService.signOut();
        return this.http.delete(`${Base.apiUrl}/auth/sign_out`, this.getRequestHeader());
    }

    public signedIn(): boolean {
        console.log(this.getAccessTokens());
        console.log(!!this.getAccessTokens());
        // return this.tokenService.userSignedIn();
        return !!this.getAccessTokens();
    }

    public getUserType(): Observable<any> {
        return this.http.get(Base.apiUrl + '/users/current_user_type', this.getRequestHeader());
    }

    public getCurrentUser(): Observable<any> {
        return this.http.get(Base.apiUrl + '/users/profile', this.getRequestHeader());
    }

    public push(regId, os_type): Observable<any> {
        return this.http.post(Base.apiUrl + '/users/push', {regId, os_type}, this.getRequestHeader());
    }

    public updateProfile(type, formData): Observable<any> {
        console.log(type);
        if (type === 'admin') {
            return this.http.post(Base.apiUrl + '/users/update_profile', {admin: formData}, Base.requestHeader());
        } else if (type === 'user') {
            return this.http.post(Base.apiUrl + '/users/update_profile', {user: formData}, Base.requestHeader());
        } else {
            return this.http.post(Base.apiUrl + '/users/update_profile', {poweruser: formData}, Base.requestHeader());
        }
    }

    public resetPassword(userEmail): Observable<any> {
        return this.http.post(Base.apiUrl + '/auth/password',
            {email: userEmail, redirect_url: `${Base.apiUrl}/auth/sign_in`},
            Base.requestHeader());
    }

    public getUserGroups(page): Observable<any> {
        return this.http.get(Base.apiUrl + '/group/my_groups?page=' + page, Base.requestHeader());
    }

    public getToken() {
        // let token_data = this.tokenService.currentAuthData;
        console.log(this.getAccessTokens());
        let token_data = this.getAccessTokens();
        console.log(token_data);
        console.log(token_data['access-token']);
        return token_data ? token_data['access-token'] : '';
    }

    // public getAuth() {
    //     return this.tokenService.currentAuthData;
    // }
}
