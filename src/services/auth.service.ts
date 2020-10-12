import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Base} from './base';
import {AngularTokenService} from 'angular-token';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(public http: HttpClient, private tokenService: AngularTokenService) {
    }

    private profileSubject = new Subject<any>();

    public listProfile(user: any) {
        this.profileSubject.next(user);
    }

    public getProfile(): Observable<any> {
        return this.profileSubject;
    }

    public login(userDetails): Observable<HttpResponse<any>> {
        return this.tokenService.signIn(userDetails);
    }

    public logout(): Observable<any> {
        return this.tokenService.signOut();
    }

    public signedIn(): boolean {
        return this.tokenService.userSignedIn();
    }

    public getUserType(): Observable<any> {
        return this.http.get(Base.apiUrl + '/users/current_user_type', Base.requestHeader());
    }

    public getCurrentUser(): Observable<any> {
        return this.http.get(Base.apiUrl + '/users/profile');
    }

    public push(regId, os_type): Observable<any> {
        return this.http.post(Base.apiUrl + '/users/push', {regId, os_type}, Base.requestHeader());
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
        let token_data = this.tokenService.currentAuthData;
        return token_data ? token_data.accessToken : '';
    }

    public getAuth() {
        return this.tokenService.currentAuthData;
    }
}
