import { Injectable } from '@angular/core';
import {Genre} from "../../models/book/genre";
import {GenreService} from "../genre/genre.service";
import {ApiService} from "../api/api.service";
import {Book} from "../../models/book/book";
import {BehaviorSubject} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  public showResults: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private searchOnlyAvailable;
  private genres: Genre[];
  public selectedBookSubject = new BehaviorSubject<Book | null>(null);
  public bookResults: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([]);
  public searchBarBookResults: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([]);
  constructor(private genreService: GenreService,
              private apiService: ApiService,
              private router: Router) {
    this.searchOnlyAvailable = false;
    this.genres = [];
    genreService.genreSubject.subscribe(value => {
      this.genres = value;
    });
  }
  public changeSearchAvailable(value :boolean){
    this.searchOnlyAvailable = value;
  }

  public getBooks(term? :string,
                   authorId?: number,
                   response?: ((value:Book[]) => Book[]),
                   error?: (error: HttpErrorResponse, statusCode: number) => void){
    const url = "library/search"
    const genreIds = this.getGenreIds();
    const params = {
      searchedValue: (term !== undefined && term.length > 1)? term : '',
      genreIds: (genreIds !== null && genreIds.length > 0)? genreIds : '',
      authorId: authorId? authorId : '',
      searchOnlyAvailable: this.searchOnlyAvailable
    };
    return this.apiService.get<Book[]>(url, params, false, response, error);

  }
  public fetchBooks(term? :string, authorId?: number){
    let response = (bookResult: Book[]) =>{
      console.log("Fetched books: ", bookResult)
      this.bookResults.next(bookResult);
      return bookResult;
    }
    let error = (error: HttpErrorResponse, statusCode: number) =>{
      console.log("Error fetching books: " + error);
      return [];
    };
    return this.getBooks(term, authorId, response, error);

  }
  public fetchSearchBarBooks(term? :string, authorId?: number){
    let response = (bookResult: Book[]) =>{
      console.log("Fetched books: ", bookResult)
      this.searchBarBookResults.next(bookResult);
      return bookResult;
    }
    let error = (error: HttpErrorResponse, statusCode: number) =>{
      console.log("Error fetching books: " + error);
      return [];
    };
    return this.getBooks(term, authorId, response, error);

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

  showBookResults() {
    this.updateShowResults(true);
    this.bookResults.next(this.searchBarBookResults.value);
  }
  hideBookResults() {
    this.updateShowResults(false);
    this.bookResults.next([]);
  }
  updateShowResults(value: boolean){
    this.showResults.next(value);

  }
  getAvailability(bookId:number) {
    const url = "library/available";
    const params = {
      "bookId": bookId
    };
    return this.apiService.get<Number>(url, params, false, (response) => {
      return response;
    }, (error) => {
      console.log(error);
    })

  }
  searchBooks(name?: string, authorId?: number) {
    this.fetchBooks(name, authorId).subscribe()
    this.showBookResults();
    this.router.navigate([""]);
  }
  navigateToBookDetail(book:Book){
    this.selectBook(book);
    this.router.navigate(['/book-view']);
  }
}
