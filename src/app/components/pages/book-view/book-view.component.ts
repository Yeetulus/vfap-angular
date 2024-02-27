import {Component, OnInit} from '@angular/core';
import { Router} from "@angular/router";
import {Book} from "../../../models/book/book";
import {BookService} from "../../../services/book/book.service";
import {getDisplayedYear} from "../../../utils/date-utils";
import {BookReview} from "../../../models/book/book-review";
import {ReviewService} from "../../../services/review/review.service";
import {Genre} from "../../../models/book/genre";
import {PageEvent} from "@angular/material/paginator";
import {ReviewComment} from "../../../models/book/review-comment";
import {FormControl} from "@angular/forms";
import {AuthService} from "../../../services/auth/auth.service";
import {UserRole} from "../../../models/auth/user-role";
import {async, combineLatest, concatMap, filter, first, forkJoin, map, of, take} from "rxjs";
import {LoanService} from "../../../services/loan/loan.service";
import {__values} from "tslib";
import {ReservationService} from "../../../services/reservation/reservation.service";

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.css',
              '../../../../style.scss']
})
export class BookViewComponent implements OnInit {
  selectedBook: Book | null;
  availableCount?: Number
  public enableReview: boolean;

  inputValue = new FormControl("");
  sliderValue = new FormControl(0);

  reviews?: BookReview
  pagedReviews: ReviewComment[] = [];
  pageSize = 5;
  pageIndex = 0;

  public newReview: { bookId: number, rating: number, comment: string } = {bookId: -1, rating: 0, comment: ''};

  constructor(private bookService: BookService,
              private reviewService: ReviewService,
              public authService: AuthService,
              private loanService: LoanService,
              private reservationService: ReservationService,
              private router: Router) {
    this.selectedBook = null;
    this.enableReview = false;
  }

  ngOnInit() {
    this.bookService.selectedBookSubject.subscribe(value => {
      this.selectedBook = value;
      if (value) {
        this.reviewService.getReview(value.id).subscribe(_value => {
          this.reviews = _value;
          this.updatePagedReviews();
        })
        this.bookService.getAvailability(value.id).subscribe(_value => {
          this.availableCount = _value;
        });
        const isValidMember$ = this.isValidMember();
        const getLoanCreated$ = this.loanService.getLoanCreated(value.id);

        forkJoin([isValidMember$, getLoanCreated$]).subscribe(([isValidMemberValue, getLoanCreatedValue]) => {
          this.enableReview = isValidMemberValue && getLoanCreatedValue;
        });
      }
    });
  }

  protected readonly getDisplayedYear = getDisplayedYear;

  searchAuthorBooks(authorId: number) {
    this.bookService.fetchBooks(undefined, authorId);
    this.bookService.showBookResults();
    this.router.navigate([""]);
  }

  searchGenreBooks(genre: Genre) {
    this.bookService.fetchBooks(genre.name, undefined);
    this.bookService.showBookResults();
    this.router.navigate([""]);
  }

  updatePagedReviews(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedReviews = this.reviews?.messages.slice(startIndex, endIndex)!;
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedReviews();
  }

  submitReview() {
    this.newReview.bookId = this.selectedBook!.id;
    this.newReview.rating = this.sliderValue.value!;
    this.newReview.comment = this.inputValue.value!;

    const userId = parseInt(localStorage.getItem("userId")!);
    const foundReview = this.reviews?.messages.find(value => value.userId === userId);
    if(foundReview){
      this.reviewService.updateReview(this.newReview.bookId, this.newReview).subscribe(value => {
        if(!value) return;
        const index = this.reviews?.messages.findIndex(review => review.userId === value.userId);
        if (index !== undefined && index !== -1) {
          this.reviews?.messages.splice(index, 1);
        }
        this.reviews?.messages.push(...this.reviews?.messages, value);
        this.updatePagedReviews();
      });
    }
    else{
      this.reviewService.leaveReview(this.newReview).subscribe(value => {
        if(!value) return;
        this.reviews?.messages.push(...this.reviews?.messages, value);
        this.updatePagedReviews();

      });
    }

  }

  protected readonly UserRole = UserRole;

  isValidMember() {
    return this.authService.isTokenValid().pipe(
      map(value => value && this.authService.getUserRole()?.valueOf() === UserRole.MEMBER)
    );
  }

  isSpecificUser(userId: number) {
    const idMatches = parseInt(localStorage.getItem("userId")!) === userId;
    return this.isValidMember().pipe(map(value => {
      if(!value) return false;
      else return value && idMatches;
    }));
  }

  deleteReview(bookId: number) {
    this.reviewService.deleteReview(bookId).subscribe(deleted => {
      const userId = parseInt(localStorage.getItem("userId")!);
      const index = this.reviews?.messages.findIndex(review => review.userId === userId);
      console.log("hello");
      if (index !== undefined && index !== -1) {
        this.reviews?.messages.splice(index, 1);
        this.updatePagedReviews();
      }
    });
  }

  createBookReservation() {
    this.reservationService.createReservation(this.selectedBook!.id).subscribe();
  }
}
