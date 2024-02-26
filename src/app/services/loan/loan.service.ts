import { Injectable } from '@angular/core';
import {ApiService} from "../api/api.service";
import {Loan} from "../../models/book/loan";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private apiService: ApiService) { }

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
}
