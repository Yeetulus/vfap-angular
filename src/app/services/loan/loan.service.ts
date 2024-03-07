import {Injectable} from '@angular/core';
import {ApiService} from "../api/api.service";
import {Loan} from "../../models/booking/loan";
import {map} from "rxjs";
import {NotificationService} from "../notification/notification.service";
import {NotificationType} from "../../models/notification";
import {BookCopy} from "../../models/book/book-copy";

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private apiService: ApiService, public notificationService: NotificationService) { }

    getAllUserLoans() {
      const url = "member/loan/get-all"
      return this.apiService.get<Loan[]>(url, {}, true, response => {
        console.log("Fetched loans: ", response);
        return response;
      }, (error, statusCode) => {
        console.log("Error fetching loans ", error);
        return error;
      });
    }
  getAllUserLoansByEmail(email:string) {
    const url = "librarian/loan/user-loans"
    return this.apiService.get<Loan[]>(url, {"userEmail": email}, true, response => {
      console.log(`Fetched user loans for email: ${email}`, response);
      return response;
    }, (error, statusCode) => {
      console.log("Error fetching loans ", error);
      return error;
    });
  }
  getAllActiveUserLoansByEmail(email:string) {
    const url = "librarian/loan/user-loans-active"
    return this.apiService.get<Loan[]>(url, {"userEmail": email}, true, response => {
      console.log(`Fetched active user loans for email: ${email}`, response);
      return response;
    }, (error, statusCode) => {
      console.log("Error fetching loans ", error);
      return error;
    });
  }
    getLoanCreated(bookId:number){
      return this.getAllUserLoans().pipe(map(value => {
        for (let i = 0; i < value.length; i++) {
          if(value[i].copy.book.id === bookId) {
            return true
          }
        }
        return false;
      }));
    }

    returnLoan(loan: Loan) {
        const url = "librarian/loan/return";
        const params = {
          "loanId": loan.id
        }
        return this.apiService.put<void>(url, {}, params, true, response => {
          this.notificationService.showNotification("Loan was returned", NotificationType.Success);
        }, error => {
          this.notificationService.showNotification("Cannot return loan", NotificationType.Error);
        });
    }

    createLoan(copy: BookCopy, email:string) {
      const url = "librarian/loan/create";
      const params ={
        "userEmail": email,
        "copyId": copy.id
      };
      return this.apiService.post<Loan>(url, {}, params, true, response => {
        this.notificationService.showNotification("Loan created", NotificationType.Success);
        return response;
      }, error => {
        this.notificationService.showNotification("Cannot create loan", NotificationType.Error);
        console.error(error);
      });
    }
}
