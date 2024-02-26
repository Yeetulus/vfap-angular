import {Book} from "../models/book/book";

export function getDisplayedYear(book: Book): string {
    return book.releaseDate!== undefined? new Date(book.releaseDate).getFullYear().toString() : "Unknown";
}
