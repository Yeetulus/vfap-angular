import {Component, OnInit} from '@angular/core';
import {LoanService} from "../../../services/loan/loan.service";
import {Loan} from "../../../models/booking/loan";

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css', '../../../../style.scss']
})
export class LoansComponent implements OnInit{

  loans: Loan[];
  shownLoans: Loan[];
  showAll: boolean;
  constructor(private loanService:LoanService) {
    this.loans = [];
    this.shownLoans = [];
    this.showAll = false;
  }
  ngOnInit(): void {
    this.loanService.getAllUserLoans().subscribe(value => {
      this.loans = value;
      this.filterLoans();
    })
  }

  changeShowAll(){
    this.showAll = !this.showAll;
    this.filterLoans()
  }
  filterLoans() {
    this.shownLoans = [];
    if(!this.showAll){
      this.shownLoans = this.loans.filter(loan => loan.actualReturnDate === null);
    }
    else{
      this.shownLoans = this.loans;
    }
  }
}
