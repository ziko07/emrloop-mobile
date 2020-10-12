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

  public listLogo(logo: any, action = 'new') {
    this.logoSubject.next({logo, action});
  }

  public getLogo(): Observable<any> {
    return this.logoSubject;
  }

  public getSingleClientLogo(id): Observable<any> {
    return this.http.get(Base.apiUrl + '/logos/' + id, Base.requestHeader());
  }

  public getLogos(page): Observable<any> {
    return this.http.get(Base.apiUrl + '/logos?page=' + page, Base.requestHeader());
  }

  public createLogo(logoDetails): Observable<any> {
    return this.http.post(Base.apiUrl + '/logos/create', { logo: logoDetails }, Base.requestHeader());
  }

  public updateLogo(logoID, logo): Observable<any> {
    return this.http.put(Base.apiUrl + `/logos/update?id=${logoID}`, { logo }, Base.requestHeader());
  }

  public deleteLogo(logoID): Observable<any> {
    return this.http.delete(Base.apiUrl + `/logos/destroy?id=${logoID}`,  Base.requestHeader());
  }
}
