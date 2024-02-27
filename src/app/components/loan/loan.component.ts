import {Component, Input} from '@angular/core';
import {Loan} from "../../models/booking/loan";

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css',
          "../../../style.scss"]
})
export class LoanComponent {

  @Input() loan!: Loan


  isPastScheduledReturnDate(): boolean {
    const oneDayBeforeScheduled = new Date(this.loan.scheduledReturnDate);
    oneDayBeforeScheduled.setDate(oneDayBeforeScheduled.getDate() - 1);

    const currentDate = new Date();
    return currentDate > oneDayBeforeScheduled;
  }
}
