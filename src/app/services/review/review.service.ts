import {Injectable} from '@angular/core';
import {ApiService} from "../api/api.service";
import {BookReview} from "../../models/book/book-review";
import {ReviewComment} from "../../models/book/review-comment";
import {NotificationService} from "../notification/notification.service";
import {NotificationType} from "../../models/notification";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private apiService:ApiService,
              private notificationService: NotificationService) { }

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

  getUserReviews(){
    const url = "member/review/get-all"
    return this.apiService.get<ReviewComment[]>(url, {}, true, response => {
      return response;
    }, (error, statusCode) => {
      console.log("Error fetching reviews: ", error);
    })
  }

  leaveReview(newReview: {bookId: number, rating: number; comment: string}) {
    const url = "member/review/create";
    return this.apiService.post<ReviewComment>(url, newReview, undefined, true, response => {
      console.log(`Review posted. `, response);
      this.notificationService.showNotification("Review posted", NotificationType.Success);
      return response;
    }, (error, statusCode) => {
      this.notificationService.showNotification("Review was not posted", NotificationType.Error);
    });
  }

  updateReview(bookId: number, newReview: {bookId: number, rating: number; comment: string}){

    const editUrl = "member/review/edit";
    const params = {
      "bookId": bookId.toString()
    }
    return this.apiService.put<ReviewComment>(editUrl, newReview, params, true, response => {
      console.log(`Review ${newReview.bookId} edited. `, newReview);
      this.notificationService.showNotification("Review edited", NotificationType.Success);
      return newReview;
    }, error => {
      console.log("Review was not updated", error);
      this.notificationService.showNotification("Review was not edited", NotificationType.Error);
      return error;
    });

  }

  deleteReview(bookId: number): Observable<boolean> {
    const url = "member/review/delete";
    const params = {
      "bookId": bookId.toString()
    }

    return this.apiService.delete<boolean>(url, params, true, response => {
      console.log("Review deleted", response);
      this.notificationService.showNotification("Review deleted", NotificationType.Success);
      return true;
    }, error => {
      this.notificationService.showNotification("Review was not deleted", NotificationType.Error);
      return false;
    })
  }
}
