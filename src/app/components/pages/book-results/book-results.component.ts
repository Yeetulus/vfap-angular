import {Component, OnInit} from '@angular/core';
import {Book} from "../../../models/book/book";
import {BookService} from "../../../services/book/book.service";
import {PageEvent} from "@angular/material/paginator";
import {Router} from "@angular/router";

@Component({
  selector: 'app-book-results',
  templateUrl: './book-results.component.html',
  styleUrls: ['./book-results.component.css',
            '../../../../styles.css']
})
export class BookResultsComponent implements OnInit{

  public showBookResults: boolean
  public bookResults: Book[];
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions = [5,10,25]

  constructor(private bookService:BookService,
              private router: Router) {
    this.bookResults = [];
    this.showBookResults = false;
  }
  ngOnInit(): void {
    this.bookService.bookResults.subscribe(value => {
      this.bookResults = value;
    });
    this.bookService.showResults.subscribe(value => {
      this.showBookResults = value
    });
  }

  onPageChange($event: PageEvent) {
    this.currentPage = $event.pageIndex;

  }

  displayedBooks(): Book[] {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.bookResults.slice(startIndex, endIndex);
  }

  showBookDetail(book: Book) {
    this.bookService.selectedBookSubject.next(book);
    this.bookService.hideBookResults();
    this.router.navigate(["/book-view"]);
  }
}
