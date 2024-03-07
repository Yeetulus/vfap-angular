import {Component, Input} from '@angular/core';
import {Loan} from "../../models/booking/loan";
import {Book} from "../../models/book/book";
import {BookService} from "../../services/book/book.service";
import {isPastScheduledReturnDate} from "../../utils/date-utils";

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css',
          "../../../style.scss"]
})
export class LoanComponent {

  @Input() loan!: Loan

  constructor(private bookService:BookService) {
  }

  navigateToBook(book: Book) {
    this.bookService.navigateToBookDetail(book);
  }
  navigateToBooksOfAuthor(name: string) {
    this.bookService.searchBooks(name, undefined);
  }

  protected readonly isPastScheduledReturnDate = isPastScheduledReturnDate;
}
