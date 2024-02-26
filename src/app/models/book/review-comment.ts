export class ReviewComment{

  bookId:number;
  name:string;
  comment?:string;
  rating: number;

  constructor(bookId:number, name:string, rating:number, comment?:string) {
    this.bookId = bookId;
    this.name = name;
    this.comment = comment;
    this.rating = rating;
  }
}
