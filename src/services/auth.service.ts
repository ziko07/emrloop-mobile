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

    listProfile(user: any) {
        this.profileSubject.next(user);
    }

    getProfile(): Observable<any> {
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

    getUserType(): Observable<any> {
        return this.http.get(Base.apiUrl + '/users/current_user_type', Base.requestHeader());
    }

    getCurrentUser(): Observable<any> {
        return this.http.get(Base.apiUrl + '/users/profile');
    }

    updateProfile(type, formData): Observable<any> {
        if (type === 'admin') {
            return this.http.post(Base.apiUrl + '/users/update_profile', {admin: formData}, Base.requestHeader());
        } else if (type === 'user') {
            return this.http.post(Base.apiUrl + '/users/update_profile', {user: formData}, Base.requestHeader());
        } else {
            return this.http.post(Base.apiUrl + '/users/update_profile', {poweruser: formData}, Base.requestHeader());
        }
    }

    resetPassword(userEmail): Observable<any> {
        return this.http.post(Base.apiUrl + '/auth/password',
            {email: userEmail, redirect_url: `${Base.apiUrl}/auth/sign_in`},
            Base.requestHeader());
    }

    getUserGroups(page): Observable<any> {
        return this.http.get(Base.apiUrl + '/group/my_groups?page=' + page, Base.requestHeader());
    }

    getToken() {
        let token_data = this.tokenService.currentAuthData;
        return token_data ? token_data.accessToken : '';
    }

    getAuth() {
        return this.tokenService.currentAuthData;
    }
}
