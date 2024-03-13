import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Base} from './base';

@Injectable({
    providedIn: 'root'
})
export class HomeService {

    constructor(public http: HttpClient) {
    }

    public list(): Observable<any> {
        return this.http.get<any>(Base.apiUrl + '/users/messages/inbox', Base.requestHeader());
    }

    public all(): Observable<any> {
        return this.http.get<any>(Base.apiUrl + '/users/messages/all', Base.requestHeader());
    }

    public task(messageId): Observable<HttpResponse<any>> {
        return this.http.get<any>(Base.apiUrl + '/users/messages/' + messageId, Base.requestHeader());
    }
    public acknowledgementSent(messageId, data): Observable <any> {
        return this.http.put(Base.apiUrl + '/users/messages/' + messageId + '/read', data, Base.requestHeader());
    }
}
