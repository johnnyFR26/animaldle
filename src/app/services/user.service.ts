import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL: string = environment.apiUrl

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(`${this.API_URL}user`);
  }

  createUser(user: any): Observable<any> {
    return this.http.post(`${this.API_URL}user`, user);
  }

  login(user: any): Observable<any> {
    return this.http.post(`${this.API_URL}login`, user);
  }
}
