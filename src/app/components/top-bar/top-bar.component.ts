import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";
import {UserRole} from "../../models/auth/user-role";
import {Book} from "../../models/book/book";
import {debounceTime, distinctUntilChanged, Observable, of, startWith, switchMap, take} from "rxjs";
import {FormControl} from "@angular/forms";
import {BookService} from "../../services/book/book.service";
import {DomSanitizer} from "@angular/platform-browser";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {MatMenuTrigger} from "@angular/material/menu";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css', "../../../style.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class TopBarComponent implements OnInit {
  @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger;

  searchInputValue: string = "";
  waitingForSearchbar:boolean = false;
  searchControl = new FormControl();
  filteredBooks$: Observable<Book[]>;

  ngOnInit(): void {
    this.searchBarBehavior();
  }

  private searchBarBehavior() {
    this.searchControl.valueChanges.subscribe(value => this.waitingForSearchbar = true);
    this.filteredBooks$ = this.searchControl.valueChanges.pipe(
        startWith(""),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(value => {
          if (this.waitingForSearchbar) {
            this.waitingForSearchbar = false;
            let trimmedValue = value.trim();
            if (trimmedValue !== '' && trimmedValue.length > 2) {
              return this.bookService.fetchSearchBarBooks(trimmedValue, undefined)
                .pipe(
                  take(5)
                );
            } else {
              return of([]);
            }
          }
          else return of([]);
        }));

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
    let searchInput = this.searchInputValue.trim();
    if (searchInput.length > 0) {

      this.updateIfDebounceTimerActive(searchInput);
      this.searchControl.setValue('');
      this.waitingForSearchbar = false;
      this.router.navigate([""])
    }
  }
  private updateIfDebounceTimerActive(input:string) {
    if (this.waitingForSearchbar) {
      let equals = this.searchControl.value.trim() !== input
      if (!equals) {
        this.bookService.fetchSearchBarBooks(input, undefined).subscribe(value => {
          this.bookService.showBookResults();
        });
      }
    }
    else{
      this.bookService.showBookResults();
    }
    this.waitingForSearchbar = false;
  }

  onLogoClick() {
    //this.bookService.resetBookResults();
    this.bookService.hideBookResults();
    this.router.navigate(['']);
  }

  logout() {
    this.authService.logout();
  }

  handlePersonIconClick() {
    this.authService.isTokenValid().subscribe(value => {
      if (!value) this.router.navigate(["/login"]);
      else if (this.menuTrigger) {
        this.menuTrigger.openMenu();
      }
    })

  }
}
