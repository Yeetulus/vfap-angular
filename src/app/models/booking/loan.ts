import {BookCopy} from "../book/book-copy";
import {User} from "../auth/user";

export class Loan{
    id:number;
    copy:BookCopy;
    user: User;
    dateBorrowed: Date;
    scheduledReturnDate: Date;
    actualReturnDate?: Date;

  constructor(id: number, copy: BookCopy, user: User, dateBorrowed: Date, scheduledReturnDate: Date, actualReturnDate: Date) {
    this.id = id;
    this.copy = copy;
    this.user = user;
    this.dateBorrowed = dateBorrowed;
    this.scheduledReturnDate = scheduledReturnDate;
    this.actualReturnDate = actualReturnDate;
  }
}
