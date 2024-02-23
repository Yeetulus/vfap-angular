import { Injectable } from '@angular/core';
import {Genre} from "../../models/genre";
import {GenreService} from "../genre/genre.service";
import {ApiService} from "../api/api.service";
import {Book} from "../../models/book";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private searchOnlyAvailable;
  private genres: Genre[];
  public selectedBookSubject = new BehaviorSubject<Book | null>(null);
  public bookResults: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([]);
  constructor(private genreService: GenreService,
              private apiService: ApiService) {
    this.searchOnlyAvailable = false;
    this.genres = [];
    genreService.genreSubject.subscribe(value => {
      this.genres = value;
    });
  }
  public changeSearchAvailable(value :boolean){
    this.searchOnlyAvailable = value;
  }

  public fetchBooks(term? :string, authorId?: number){
    const url = "library/search"
    const genreIds = this.getGenreIds();
    const params = {
      searchedValue: (term !== undefined && term.length > 1)? term : '',
      genreIds: (genreIds !== null && genreIds.length > 0)? genreIds : '',
      authorId: authorId? authorId : '',
      searchOnlyAvailable: this.searchOnlyAvailable
    };

    let books = this.apiService.get<Book[]>(url, params, false, response => {
      console.log("Fetched books", response);
      return response;
    }, (error, statusCode) => {
      console.log("Error fetching books: " + error);
      return [];
    });

    books.subscribe(value => {
      this.bookResults.next(value);
    })
    return books;

  }


  private getGenreIds(){
    let genreIds:number[] = [];
    this.genres.forEach(g => {
      if(g.show){
        genreIds.push(g.id);
      }
    });
    if(genreIds.length === 0) return null;
    return genreIds;
  }

  selectBook(selectedBook: Book) {
    this.selectedBookSubject.next(selectedBook);
  }
}
