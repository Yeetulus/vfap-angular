import {Component, Input, OnInit} from '@angular/core';
import {Book} from "../../models/book/book";
import {ReviewService} from "../../services/review/review.service";
import {BookReview} from "../../models/book/book-review";
import {BookService} from "../../services/book/book.service";
import {getDisplayedYear} from "../../utils/date-utils";

@Component({
  selector: 'app-book-result',
  templateUrl: './book-result.component.html',
  styleUrls: ['./book-result.component.css',
    '../../../style.scss']
})
export class BookResultComponent implements OnInit{

  @Input() book!: Book
  reviews?:BookReview
  availability: number

  constructor(private reviewService: ReviewService,
              private bookService: BookService) {
    this.availability = 0;
  }

  ngOnInit(): void {
    this.reviewService.getReview(this.book.id).subscribe(value => {
        console.log('Fetched review for book ' + this.book.id + '.: ', value);
      this.reviews = value;
    });
    this.bookService.getAvailability(this.book.id).subscribe(value => {
      console.log('Fetched book availability for book ' + this.book.id + '.: ', value);
      this.availability = value.valueOf();
    });
  }

  protected readonly getDisplayedYear = getDisplayedYear;
}
