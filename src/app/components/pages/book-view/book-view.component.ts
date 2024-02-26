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
import {async, concatMap, forkJoin, map, of, take} from "rxjs";
import {LoanService} from "../../../services/loan/loan.service";
import {__values} from "tslib";

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

  public newReview: {bookId:number, rating: number, comment: string } = {bookId: -1, rating: 0, comment: '' };

  constructor(private bookService:BookService,
              private reviewService: ReviewService,
              public authService: AuthService,
              private loanService: LoanService,
              private router: Router) {
    this.selectedBook = null;
    this.enableReview = false;
  }

  ngOnInit() {
     this.bookService.selectedBookSubject.subscribe(value => {
       this.selectedBook = value;
       if(value){
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
    this.bookService.leaveReview(this.newReview);
  }

  protected readonly UserRole = UserRole;

  isValidMember(){
    return this.authService.isTokenValid().pipe(
        map(value => value && this.authService.getUserRole()?.valueOf() === UserRole.MEMBER)
    );

  }

}
