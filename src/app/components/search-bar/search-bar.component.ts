import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatAutocomplete} from "@angular/material/autocomplete";
import {debounceTime, distinctUntilChanged, Subject} from "rxjs";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  @Input() placeholder: string = 'Search...';
  @Input() inputType: string = 'text';
  @Input() autocompleteRef?: MatAutocomplete;
  @Output() searchQueryChanged = new EventEmitter<string>();
  @Output() searchSubmit = new EventEmitter<string>();
  private searchQuerySubject = new Subject<string>();

  searchQuery: string = '';
  submitted = false;
  constructor() {
    this.setupDebounce();
  }

  onSearchQueryChanged(): void {
    this.searchQuerySubject.next(this.searchQuery);
  }

  private setupDebounce(): void {
    this.searchQuerySubject.pipe(
        debounceTime(300),
        distinctUntilChanged()
    ).subscribe(() => {
      if(this.submitted) {
        this.submitted = false;
      }else{
        this.searchQueryChanged.emit(this.searchQuery);
      }
    });
  }

  submitSearch() {
    this.searchSubmit.emit(this.searchQuery);
    this.submitted = true;
  }
}
