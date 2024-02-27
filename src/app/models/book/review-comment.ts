export class ReviewComment{

  bookId:number;
  userId:number
  name:string;
  comment?:string;
  rating: number;

  constructor(userId:number, bookId:number, name:string, rating:number, comment?:string) {
    this.bookId = bookId;
    this.userId = userId;
    this.name = name;
    this.comment = comment;
    this.rating = rating;
  }
}
