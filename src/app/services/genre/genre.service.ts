import { Injectable } from '@angular/core';
import {Genre} from "../../models/genre";
import {BehaviorSubject, delay} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  genreSubject: BehaviorSubject<Genre[]> = new BehaviorSubject<Genre[]>([]);

  constructor() {
  }

  changeShowGenre(genre: Genre) {

  }
}
