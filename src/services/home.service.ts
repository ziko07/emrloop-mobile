import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Base} from './base';

@Injectable({
    providedIn: 'root'
})
export class HomeService {
    api_url = Base.api_url;

    constructor(public http: HttpClient) {}


    public list(): Observable<HttpResponse<any>> {
        return this.http.get<any>(this.api_url + '/users/6/messages/inbox');
    }

    public all(): Observable<HttpResponse<any>> {
        return this.http.get<any>(this.api_url + '/users/6/messages/all');
    }

    public task(message_id): Observable<HttpResponse<any>> {
        console.log('testtttttttttttttt')
        console.log(message_id)
        return this.http.get<any>(this.api_url + '/users/6/messages/' + message_id);
    }
}
