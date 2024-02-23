import {Component, OnInit} from '@angular/core';
import {Genre} from "../../models/genre";
import {GenreService} from "../../services/genre/genre.service";
import {BookService} from "../../services/book/book.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{

  genres: Genre[] = [];
  showAvailable: boolean = false;

  constructor(private genreService: GenreService,
              private bookService: BookService) {
  }
  ngOnInit(): void {
    this.genreService.genreSubject.subscribe(value => {
      this.genres = value;
    });
  }

  onSlideToggleChange() {
    this.bookService.changeSearchAvailable(this.showAvailable);
  }
}
