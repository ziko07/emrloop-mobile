import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Base} from './base';
import {AuthService} from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class HomeService {
    api_url = Base.apiUrl;

    constructor(public http: HttpClient, private auth: AuthService) {
    }

    public list(): Observable<HttpResponse<any>> {
        return this.http.get<any>(this.api_url + '/users/messages/inbox');
    }

    public all(): Observable<HttpResponse<any>> {
        return this.http.get<any>(this.api_url + '/users/messages/all');
    }

    public task(message_id): Observable<HttpResponse<any>> {
        return this.http.get<any>(this.api_url + '/users/messages/' + message_id);
    }
    public acknowledgementSent(message_id,data): Observable <any> {
    return this.http.put(this.api_url + '/users/messages/' + message_id + '/read', data);
}
}
