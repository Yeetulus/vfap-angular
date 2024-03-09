import {Component, OnInit} from '@angular/core';
import {Book} from "../../../../models/book/book";
import {BookService} from "../../../../services/book/book.service";
import {ModalService} from "../../../../services/modal/modal.service";
import {AuthorService} from "../../../../services/author/author.service";
import {Author} from "../../../../models/book/author";
import {ModalParams} from "../../../../models/modal/modal-params";
import {Genre} from "../../../../models/book/genre";
import {GenreService} from "../../../../services/genre/genre.service";
import BookRequest from "../../../../models/book/book-request";
import {getDisplayedYear} from "../../../../utils/date-utils";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-librarian-books',
  templateUrl: './librarian-books.component.html',
  styleUrls: ['./librarian-books.component.css', '../../../../../style.scss']
})
export class LibrarianBooksComponent implements OnInit{

  bookResults: Book[] = [];
  displayedBooks: Book[] = [];
  authors: Author[] = [];
  genres: Genre[] = [];

  currentPage: number = 1;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(private bookService: BookService,
              private modalService: ModalService,
              private authorService: AuthorService,
              private genreService: GenreService) {
  }

  ngOnInit(): void {
    this.authorService.fetchAuthors();
    this.genreService.fetchGenres();
    this.authorService.authorSubject.subscribe(value => {
      this.authors = value;
    });
    this.genreService.genreSubject.subscribe(value => {
      this.genres = value;
    })
  }

  getGenres(){
    return this.genres.map(genre => ({display: genre.name, value: genre.id}));;
  }
  getAuthors(authors?: Author[]){
    const _authors = authors? authors : this.authors;
    return _authors.map(author => ({ display: author.name, value: author.id }));
  }
  createBook() {
    const authorOptions = this.getAuthors();
    const modalParams: ModalParams = {
      title: `Create book`,
      fields: [
        {name: "title", placeholder: "Title", type: "text"},
        {name: "genre", placeholder: "Genre", type: "select", options: this.getGenres()},
        {name: "authors", placeholder: "Authors", type: "multiselect", options: authorOptions},
        {name: "pages", placeholder: "Pages", type: "number"},
        {name: "releaseDate", placeholder: "Date", type: "datepicker"},
      ]
    };
    this.modalService.openModal(modalParams).subscribe(value => {
      if(value && value.title && value.pages && value.releaseDate && value.genre && value.authors){
        const request: BookRequest = {
          bookId: -1,
          title: value.title,
          pages: value.pages,
          releaseDate: value.releaseDate,
          genreId: value.genre,
          authorIds: value.authors,
        };

        this.bookService.createBook(request).subscribe(value =>{
          this.bookResults.push(value);
          this.updateDisplayedBooks();
        });
      }


    });
  }

  editBook(book: Book) {
    const authorOptions = this.getAuthors()
    const currentAuthors = this.getAuthors(book.authors);
    const modalParams: ModalParams = {
      title: `Edit book ${book.title}`,
      fields: [
        {name: "title", placeholder: "Title", type: "text", initialValue: book.title},
        {name: "genre", placeholder: "Genre", type: "select", options: this.getGenres(), initialValue: {display: book.genre.name, value: book.genre.id}},
        {name: "authors", placeholder: "Authors", type: "multiselect", options: authorOptions, initialValue: currentAuthors},
        {name: "pages", placeholder: "Pages", type: "number", initialValue: book.pages},
        {name: "releaseDate", placeholder: "Date", type: "datepicker", initialValue: book.releaseDate},
      ]
    };
    this.modalService.openModal(modalParams).subscribe(value => {
      if(value && value.title && value.pages && value.releaseDate && value.genre && value.authors){
        const request: BookRequest = {
          bookId: book.id,
          title: value.title,
          pages: value.pages,
          releaseDate: value.releaseDate,
          genreId: value.genre,
          authorIds: value.authors,
        };

        this.bookService.editBook(request).subscribe(value =>{
          let books = this.bookResults;
          const index = books.findIndex(b => b.id === value.id);
          if (index !== undefined && index !== -1) {
            books[index] = value;
            this.bookResults = books;
            this.updateDisplayedBooks();
          }
        });
      }


    });
  }

  deleteBook(book: Book) {
    this.bookService.deleteBook(book).subscribe(() =>{
      const index = this.bookResults.findIndex(_book => _book.id === book.id);
      if (index !== undefined && index !== -1) {
        this.bookResults.splice(index, 1);
        this.updateDisplayedBooks();
      }
    })
  }

  searchBooks($event: string) {
    this.bookService.getBooks($event, undefined, value => {
      this.bookResults = value;
      this.updateDisplayedBooks();
      return value;
    }).subscribe();
  }

  pageChanged(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.updateDisplayedBooks();
  }

  private updateDisplayedBooks(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedBooks = this.bookResults.slice(startIndex, endIndex);
  }

  protected readonly getDisplayedYear = getDisplayedYear;
}
