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

  /**
   * Loads a list of animals from the API and returns an observable.
   * 
   * @returns An observable of the list of animals.
   */
  getAnimals(): Observable<any> {
    return this.http.get(`${this.API_URL}animals`)
  }

}
