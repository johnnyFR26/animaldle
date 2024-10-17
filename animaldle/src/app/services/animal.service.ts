import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  private API_URL: string = 'http://localhost:3333/'

  constructor(private http: HttpClient) { }

  getAnimals(): Observable<any> {
    return this.http.get(`${this.API_URL}animals`);
  }
  

}
