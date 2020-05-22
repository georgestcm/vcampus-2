import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RouteConfig } from '../route.config';

@Injectable()
export class HttpClientService {

  constructor(private http: HttpClient,
    private routeConfig: RouteConfig) { }

  //######################## Http method to make anonymous request : start ########################
  get(url: string) {
    return this.http.get<any>(this.routeConfig.Url(url))
  }

  post(url: string, data: any) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const httpOptions = { headers: headers }
    let body = JSON.stringify(data);

    return this.http.post<any>(this.routeConfig.Url(url), body, httpOptions);
  }

  loginPost(url: string, data: any) {
    const body = new HttpParams()
    .set('Username', data.Username)
    .set('Password', data.Password)
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const httpOptions = { headers: headers }
    return this.http.post<any>(this.routeConfig.Url(url), body, httpOptions)
  }

  //######################## Http method to make anonymous request : End ##########################


  //######################## Http method to make authorize request : start ########################

  authGet(url: string) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
    const options = { headers: headers }
    return this.http.get<any>(this.routeConfig.Url(url), options)
  }

  authOctetGet(url: string) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/octet-stream', 'Accept': 'application/pdf' });
    headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
    const options = { headers: headers, 'responseType': 'content' as 'json' }
    return this.http.get<any>(this.routeConfig.Url(url), options).toPromise();
  }

  authPost(url: string, data: any) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));

    const options = { headers: headers };
    let body = JSON.stringify(data);

    return this.http.post<any>(this.routeConfig.Url(url), body, options);
  }

  authPut(url: string, data: any) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));

    const options = { headers: headers };
    let body = JSON.stringify(data);

    return this.http.put<any>(this.routeConfig.Url(url), body, options);
  }

  authDelete(url: string) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));

    const options = { headers: headers };
    return this.http.delete<any>(this.routeConfig.Url(url), options);
  }

  authImageUpload(url: string, file: any) {
    let input = new FormData();
    input.append("file", file);
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/json');
    headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
    const httpOptions = { headers: headers }
    return this.http.post<any>(this.routeConfig.Url(url), input, httpOptions)
  }
  //######################## Http method to make authorize request : End ##########################
}
