import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";
import {UserRole} from "../../models/auth/user-role";
import {Book} from "../../models/book";
import {debounceTime, distinctUntilChanged, Observable, of, startWith, switchMap, take} from "rxjs";
import {FormControl} from "@angular/forms";
import {BookService} from "../../services/book/book.service";
import {DomSanitizer} from "@angular/platform-browser";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css', "../../../style.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class TopBarComponent implements OnInit {

  searchInputValue: string = "";
  waitingForSearchbar:boolean = false;
  searchControl = new FormControl();
  filteredBooks$: Observable<Book[]>;

  ngOnInit(): void {
    this.filteredBooks$ = this.searchControl.valueChanges.pipe(source => {
      this.waitingForSearchbar = true;
      console.log("waiting for result");
      return source.pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(value => {
          let trimmedValue = value.trim();
          if (trimmedValue !== '' && trimmedValue.length > 2) {
            console.log(value.trim())
            return this.bookService.fetchBooks(value.toString(), undefined)
              .pipe(
                take(5)
              );
          } else {
            return of([]);
          }
        }));
    });
  }

  constructor(public authService: AuthService,
              public bookService: BookService,
              public router: Router,
              private sanitizer: DomSanitizer) {
    this.filteredBooks$ = of([]);
  }

  displayBook(book: Book) {
    if (!book) {
      return '';
    }

    const searchValue = this.searchControl.value;
    const title = book.title;

    let highlightedTitle = title;

    if (searchValue && title.toLowerCase().includes(searchValue.toLowerCase())) {
      const regex = new RegExp(`(${searchValue})`, 'gi');
      highlightedTitle = title.replace(regex, '<span class="text-primary-bold">$1</span>');
    }

    const authors = book.authors.map(author => {
      const authorName = author.name;
      let highlightedAuthor = authorName;

      if (searchValue && authorName.toLowerCase().includes(searchValue.toLowerCase())) {
        const regex = new RegExp(`(${searchValue})`, 'gi');
        highlightedAuthor = authorName.replace(regex, '<span class="text-primary-bold">$1</span>');
      }

      return highlightedAuthor;
    });

    const displayedAuthors = authors.map(author => `<span>${author}</span>`).join(', ');

    return this.sanitizer.bypassSecurityTrustHtml(`
    <div class="search-result-body">
      <span class="search-result-title-size">${highlightedTitle}</span>
      <br/>
      <span>${displayedAuthors}</span>
    </div>
  `);
  }

  protected readonly UserRole = UserRole;

  showBookDetail($event: MatAutocompleteSelectedEvent) {
    const selectedBook: Book = $event.option.value;
    if (selectedBook !== null) {
      this.bookService.selectBook(selectedBook);
      this.router.navigate(['/book-view']);
      this.searchControl.setValue("");

    }
  }

  onEnter() {
    if (this.searchControl.value && this.searchControl.value.trim().length > 0) {

      if(this.waitingForSearchbar){
        let equals = this.searchControl.value.trim() !== this.searchInputValue.trim()
        if(!equals) this.bookService.fetchBooks(this.searchControl.value.toString(), undefined);
      }
      this.searchControl.setValue('');
      this.bookService.showBookResults();
      this.waitingForSearchbar = false;
      this.router.navigate([""])
    }
  }

  onLogoClick() {
    this.bookService.resetBookResults();
    this.bookService.hideBookResults();
    this.router.navigate(['']);
  }
}
