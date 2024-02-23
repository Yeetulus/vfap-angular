import {Book} from "./book";

export class Author{

  public id:number;
  public name:string;
  public books:Book[];

  constructor(id:number, name:string, books: Book[]) {
    this.id = id;
    this.name = name;
    this.books = books;
  }
}
