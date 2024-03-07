import {Component, OnInit} from '@angular/core';
import {GenreService} from "../../../../services/genre/genre.service";
import {Genre} from "../../../../models/book/genre";

@Component({
  selector: 'app-librarian-genres',
  templateUrl: './librarian-genres.component.html',
  styleUrls: ['./librarian-genres.component.css', '../../../../../style.scss']
})
export class LibrarianGenresComponent implements OnInit{

  genres: Genre[] = [];
  constructor(private genreService: GenreService) {
  }

  ngOnInit(): void {
    this.genreService.fetchGenres();
    this.genreService.genreSubject.subscribe(value => {
      this.genres = value;
      console.log(value);
    })
  }


  editGenre(genre: Genre) {

  }

  deleteGenre(genre: Genre) {

  }

  createGenre() {

  }
}
