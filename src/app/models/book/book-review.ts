import {ReviewComment} from "./review-comment";

export class BookReview{

  messages: ReviewComment[]
  reviewsCount: number
  average: number

  constructor(messages: ReviewComment[], reviewsCount: number, average: number) {
    this.messages = messages;
    this.reviewsCount = reviewsCount;
    this.average = average;
  }

}
