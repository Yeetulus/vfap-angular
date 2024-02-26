import {Component, Input, OnInit} from '@angular/core';
import {Book} from "../../models/book";

@Component({
  selector: 'app-book-result',
  templateUrl: './book-result.component.html',
  styleUrls: ['./book-result.component.css',
    '../../../style.scss']
})
export class BookResultComponent implements OnInit{

  @Input() book!: Book

  ngOnInit(): void {
  }

  getDisplayedYear(): string {
    const book = this.book;
    ;
    return book.releaseDate!== undefined? new Date(book.releaseDate).getFullYear().toString() : "Unknown";
  }
}
