import {Component, Input} from '@angular/core';
import {Loan} from "../../models/booking/loan";
import {Book} from "../../models/book/book";
import {BookService} from "../../services/book/book.service";

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
  isPastScheduledReturnDate(): boolean {
    const oneDayBeforeScheduled = new Date(this.loan.scheduledReturnDate);
    oneDayBeforeScheduled.setDate(oneDayBeforeScheduled.getDate() - 1);

    const currentDate = new Date();
    return currentDate > oneDayBeforeScheduled;
  }

  navigateToBook(book: Book) {
    this.bookService.navigateToBookDetail(book);
  }
  navigateToBooksOfAuthor(name: string) {
    this.bookService.searchBooks(name, undefined);
  }
}
