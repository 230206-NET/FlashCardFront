import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Flashcard } from './models/flashcard';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiRoot: string = "https://flashcardbackend1.azurewebsites.net";


  constructor(private http: HttpClient) { 

  }

  getAllPosts(): Observable<Array<Flashcard>>{
    return this.http.get(this.apiRoot + "/Card/Flashcards") as Observable<Array<Flashcard>>;
  }

  createCard(card: Flashcard): Observable<Flashcard>{
    const url = this.apiRoot + "/Card/Flashcards";
    const headers = {
      'Content-Type' : 'application/json'
    }

    return this.http.post(url, card, {headers: headers}) as Observable<Flashcard>;
  }

  editCard(card: Flashcard): Observable<Flashcard>{
    const url = this.apiRoot + "/Card/Update";
    const headers = {
      'Content-Type' : 'application/json'
    }

    return this.http.put(url, card, {headers: headers}) as Observable<Flashcard>;
  }

  deleteCard(id: number): Observable<boolean>{
    return this.http.delete(this.apiRoot + "/Card/Delete?ID=" + id) as Observable<boolean>;
  }

}
