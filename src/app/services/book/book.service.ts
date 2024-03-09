import {Injectable} from '@angular/core';
import {GenreService} from "../genre/genre.service";
import {ApiService} from "../api/api.service";
import {Book} from "../../models/book/book";
import {BehaviorSubject} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import BookRequest from "../../models/book/book-request";
import {NotificationService} from "../notification/notification.service";
import {NotificationType} from "../../models/notification";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  public showResults: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private searchOnlyAvailable;
  public selectedBookSubject = new BehaviorSubject<Book | null>(null);
  public bookResults: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([]);
  public searchBarBookResults: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([]);
  constructor(private genreService: GenreService,
              private notificationService: NotificationService,
              private apiService: ApiService,
              private router: Router) {
    this.searchOnlyAvailable = false;

  }
  public changeSearchAvailable(value :boolean){
    this.searchOnlyAvailable = value;
  }

  public getBooks(term? :string,
                   authorId?: number,
                   response?: ((value:Book[]) => Book[]),
                   error?: (error: HttpErrorResponse, statusCode: number) => void){
    const url = "library/search"
    const genreIds = this.genreService.getGenreIds();
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

  editBook(request: BookRequest) {
    const url = "librarian/book/update";
    return this.apiService.put<Book>(url, request, {}, true, response => {
      this.notificationService.showNotification(`Updated book ${request.bookId}`);
      return response;
    }, error => {
      console.log(error);
      this.notificationService.showNotification("Cannot update book", NotificationType.Error);
    }, true);
  }

  deleteBook(book: Book) {
    const url = "librarian/book/delete";
    const params = {
      "id": book.id
    };
    return this.apiService.delete<void>(url, params, true, response => {
      this.notificationService.showNotification(`Deleted book ${book.title}`);
      return response;
    }, error => {
      console.log(error);
      this.notificationService.showNotification(`Cannot delete book ${book.title}`, NotificationType.Error);
    }, true);
  }

  createBook(request: BookRequest) {
    const url = "librarian/book/create";
    return this.apiService.post<Book>(url, request, {}, true, response => {
      this.notificationService.showNotification(`Created book ${request.title}`);
      return response;
    }, error => {
      console.log(error);
      this.notificationService.showNotification("Cannot create book", NotificationType.Error);
    }, true);
  }
}
