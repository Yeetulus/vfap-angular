import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Book} from "../../../models/book";
import {BookService} from "../../../services/book/book.service";

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.css']
})
export class BookViewComponent implements OnInit {
  selectedBook: Book|null;

  constructor(private bookService:BookService) {
    this.selectedBook = null;
  }

  ngOnInit() {
     this.bookService.selectedBookSubject.subscribe(value => {
       this.selectedBook = value;
    })
  }
}
