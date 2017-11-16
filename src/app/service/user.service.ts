import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(userId): Observable<any> {
    return this.http.get(`http://localhost:9090/users/${userId}`,{
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
      })
    });
  }

}
