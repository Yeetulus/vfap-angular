import {Component, Input, OnInit} from '@angular/core';
import {Genre} from "../../models/genre";
import {GenreService} from "../../services/genre/genre.service";
import {BookService} from "../../services/book/book.service";

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent implements OnInit{

  constructor(private genreService: GenreService) {
  }
  ngOnInit(): void {

  }
  @Input() genre!: Genre;

  onCheckboxChange() {
    this.genre.show = !this.genre.show;
  }
  toggleGenre() {
    this.genre.show = !this.genre.show;
    this.genreService.updateGenres(this.genre.id, this.genre.show);
  }
}
