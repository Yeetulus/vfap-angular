import { Injectable } from '@angular/core';
import {ApiService} from "../api/api.service";
import {BookReview} from "../../models/book/book-review";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private apiService:ApiService) { }

  getReview(bookId:number){
    const url = "library/review";
    const params = {
      "bookId": bookId
    }
    return this.apiService.get<BookReview>(url, params, false, (response) =>{
      return response;
    }, (error) =>{
      console.log(error);
    });
  }
}
