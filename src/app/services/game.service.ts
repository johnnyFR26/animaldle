import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private API_URL: string = environment.apiUrl

  constructor(private http: HttpClient) { }

  getGames(): Observable<any> {
    return this.http.get(`${this.API_URL}games`)
  }
  
  createGame(game: any): Observable<any> {
    return this.http.post(`${this.API_URL}games`, game)
  }

}
