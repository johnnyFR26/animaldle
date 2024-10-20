import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private API_URL: string = 'https://api-animaldle.onrender.com/'

  constructor(private http: HttpClient) { }

  getGames(): Observable<any> {
    return this.http.get(`${this.API_URL}games`);
  }
  
  createGame(game: any): Observable<any> {
    return this.http.post(`${this.API_URL}games`, game);
  }

}
