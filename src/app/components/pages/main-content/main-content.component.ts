import {Component, OnInit} from '@angular/core';
import {GenreService} from "../../../services/genre/genre.service";

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit{

  constructor(private genreService: GenreService) {
  }
  ngOnInit(): void {
    this.genreService.fetchGenres();
  }

}
