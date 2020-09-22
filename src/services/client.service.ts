import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Base} from './base';

@Injectable({
    providedIn: 'root'
})

export class ClientService {
    constructor(public http: HttpClient) {
    }

    private clientSubject = new Subject<any>();

    listClient(client: any, action = 'new') {
        this.clientSubject.next({client, action});
    }

    getClient(): Observable<any> {
        return this.clientSubject;
    }

    getSingleClient(id): Observable<any> {
        return this.http.get(Base.apiUrl + '/clients/' + id, Base.requestHeader());
    }

    getClients(page): Observable<any> {
        return this.http.get(Base.apiUrl + '/clients?page=' + page, Base.requestHeader());
    }

    addClient(name): Observable<any> {
        return this.http.post(Base.apiUrl + '/clients', {name}, Base.requestHeader());
    }

    editClient(id, name): Observable<any> {
        return this.http.patch(Base.apiUrl + '/clients/' + id, {name}, Base.requestHeader());
    }

    deleteClient(clientId): Observable<any> {
        return this.http.delete(Base.apiUrl + '/clients/' + clientId, Base.requestHeader());
    }
}
