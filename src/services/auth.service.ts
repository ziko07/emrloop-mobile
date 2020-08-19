import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Base} from './base';
import {AngularTokenService} from 'angular-token';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(public http: HttpClient, private tokenService: AngularTokenService) {
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

    getCurrentUser(): Observable<any> {
        return this.http.get(Base.api_url + '/users/profile');
    }

    resetPassword(userEmail): Observable<any> {
        return this.http.post(Base.api_url + '/auth/password', {email: userEmail});
    }

    getToken() {
        let token_data = this.tokenService.currentAuthData;
        return token_data ? token_data.accessToken : '';
    }

    getAuth() {
        return this.tokenService.currentAuthData;
    }
}
