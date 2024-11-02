import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  private API_URL: string = environment.apiUrl
  constructor(private http: HttpClient) { }

  getAnimals(): Observable<any> {
    return this.http.get(`${this.API_URL}animals`)
  }

}
