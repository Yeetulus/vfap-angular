import {Injectable, OnInit} from '@angular/core';
import {Genre} from "../../models/genre";
import {BehaviorSubject, delay} from "rxjs";
import {ApiService} from "../api/api.service";
import {NonNullableFormBuilder} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class GenreService{


  url = "library/"
  genreSubject: BehaviorSubject<Genre[]> = new BehaviorSubject<Genre[]>([]);

  constructor(private apiService: ApiService) {
  }

  changeShowGenre(genre: Genre) {

  }

  fetchGenres(){
    this.apiService.get<Genre[]>(
      `${this.url}genres`,
      undefined,
      false,
      (response : Genre[]) => {
        this.genreSubject.next(response);
        console.log("Genres: ", response);
    }, (error, statusCode) => {
        console.log("Cannot get genres: " + error);
    }).subscribe();
  }

  updateGenres(id: number, show: boolean) {
    let genre = this.genreSubject.value.find(g => g.id === id);
    if(genre){
      genre.show = show;
      this.genreSubject.next(this.genreSubject.value);
    }
  }
}
