import {Book} from "../models/book/book";
import {Loan} from "../models/booking/loan";

export function getDisplayedYear(book: Book): string {
    return book.releaseDate!== undefined? new Date(book.releaseDate).getFullYear().toString() : "Unknown";
}

export function isPastScheduledReturnDate(loan: Loan): boolean {
    const oneDayBeforeScheduled = new Date(loan.scheduledReturnDate);
    oneDayBeforeScheduled.setDate(oneDayBeforeScheduled.getDate() - 1);

    const currentDate = new Date();
    return currentDate > oneDayBeforeScheduled;
}
