import {User} from "../auth/user";
import {Book} from "../book/book";

export class Reservation{

  id:number;
  user:User;
  book:Book;

  constructor(id: number, user: User, book: Book) {
    this.id = id;
    this.user = user;
    this.book = book;
  }
}
