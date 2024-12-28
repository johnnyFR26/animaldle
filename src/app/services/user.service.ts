import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL: string = environment.apiUrl

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(`${this.API_URL}user`);
  }

  createUser(user: any): Observable<any> {
    return this.http.post(`${this.API_URL}user`, user);
  }

  /**
   * Performs a login operation with the given user credentials.
   *
   * @param user The user credentials to use for the login operation.
   * @returns An observable that emits the response from the server. The response
   *          body should contain the user data and a token to be used for subsequent
   *          requests.
   */
  login(user: any): Observable<any> {
    return this.http.post(`${this.API_URL}login`, user);
  }

  /**
   * Performs a GET request to retrieve the count of games played by a user.
   *
   * @param userId The id of the user to retrieve the count for.
   * @returns An observable that emits the response from the server. The response
   *          body should contain the count of games played by the user.
   */
  userGameCount(userId: number): Observable<any> {
    return this.http.get(`${this.API_URL}user/game/${userId}`);
  }
}
