import {Book} from "./book";
import {CopyCondition} from "./copy-condition";

export class BookCopy{
    id:number;
    book: Book;
    bookCondition: CopyCondition;

    constructor(id:number, book:Book, condition: CopyCondition) {
        this.id = id;
        this.book = book;
        this.bookCondition = condition;
    }

}
