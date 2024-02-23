import {Component, OnInit} from '@angular/core';
import {Book} from "../../models/book";
import {BookService} from "../../services/book/book.service";

@Component({
  selector: 'app-book-results',
  templateUrl: './book-results.component.html',
  styleUrls: ['./book-results.component.css']
})
export class BookResultsComponent implements OnInit{

  public bookResults: Book[];

  constructor(private bookService:BookService) {
    this.bookResults = [];
  }
  ngOnInit(): void {
    this.bookService.bookResults.subscribe(value => {
      this.bookResults = value;
    })
  }

}
