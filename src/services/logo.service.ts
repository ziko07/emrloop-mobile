import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Base } from './base';

@Injectable({
  providedIn: 'root'
})
export class LogoService {
  constructor(public http: HttpClient) { }

  getLogos(): Observable<any> {
    return this.http.get(Base.apiUrl + '/logos/get_client_logo', Base.requestHeader());
  }

  createLogo(logoDetails): Observable<any> {
    return this.http.post(Base.apiUrl + '/logos/create', { logo: logoDetails }, Base.requestHeader());
  }
}
