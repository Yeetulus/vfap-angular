import { Component } from '@angular/core';
import {LoanService} from "../../../../services/loan/loan.service";
import {Loan} from "../../../../models/booking/loan";
import {isPastScheduledReturnDate} from "../../../../utils/date-utils";
import {Router} from "@angular/router";

@Component({
  selector: 'app-librarian-loans',
  templateUrl: './librarian-loans.component.html',
  styleUrls: ['./librarian-loans.component.css', '../../../../../style.scss']
})
export class LibrarianLoansComponent {
  showOnlyActive: boolean = false;
  private searchValue: string = '';

  public loans: Loan[] = [];

  constructor(public loanService: LoanService,
              private router: Router) {
  }

  searchLoansFromUser(query: string): void {
    this.loans = [];

    this.searchValue = query;
    if(this.showOnlyActive){
      this.loanService.getAllActiveUserLoansByEmail(query).subscribe(value => {
        this.loans = value;
      });
    } else{
      this.loanService.getAllUserLoansByEmail(query).subscribe(value => {
        this.loans = value;
      });
    }
  }

  changeShowOnlyActive() {
    this.showOnlyActive = !this.showOnlyActive;
    this.searchLoansFromUser(this.searchValue);
  }

  protected readonly isPastScheduledReturnDate = isPastScheduledReturnDate;

  returnLoan(loan: Loan) {
    this.loanService.returnLoan(loan).subscribe(() => {
      loan.actualReturnDate = new Date();
    });
  }

  createLoan() {
    this.router.navigate(['librarian/copies'])
  }
}
