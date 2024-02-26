import {Component, Input} from '@angular/core';
import {BookReview} from "../../models/book/book-review";

@Component({
  selector: 'app-review-stars',
  templateUrl: './review-stars.component.html',
  styleUrls: ['./review-stars.component.css']
})
export class ReviewStarsComponent {

  @Input() reviews!: BookReview

  getRatingGradient() {
    const yellow = "#ffea00";
    const white = "#ffffff";
    let result = Math.round((this.reviews?.average! / 5.0) * 100);

    return `linear-gradient(to right, ${yellow} 0%, ${yellow} ${result}%, ${white} ${result}%, ${white} 100%)`;
  }
}
