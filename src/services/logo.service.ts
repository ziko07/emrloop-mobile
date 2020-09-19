import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Base } from './base';

@Injectable({
  providedIn: 'root'
})
export class LogoService {
  constructor(public http: HttpClient) { }

  private logoSubject = new Subject<any>();

  listLogo(logo: any, action = 'new') {
    this.logoSubject.next({logo, action});
  }

  getLogo(): Observable<any> {
    return this.logoSubject;
  }

  getSingleClientLogo(id): Observable<any> {
    return this.http.get(Base.apiUrl + '/logos/' + id, Base.requestHeader());
  }

  getLogos(): Observable<any> {
    return this.http.get(Base.apiUrl + '/logos', Base.requestHeader());
  }

  createLogo(logoDetails): Observable<any> {
    return this.http.post(Base.apiUrl + '/logos/create', { logo: logoDetails }, Base.requestHeader());
  }

  updateLogo(logoID, logo): Observable<any> {
    return this.http.put(Base.apiUrl + `/logos/update?id=${logoID}`, { logo }, Base.requestHeader());
  }

  deleteLogo(logoID): Observable<any> {
    return this.http.delete(Base.apiUrl + `/logos/destroy?id=${logoID}`,  Base.requestHeader());
  }
}
