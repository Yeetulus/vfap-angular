import {Component, OnInit} from '@angular/core';
import {GenreService} from "../../../../services/genre/genre.service";
import {Genre} from "../../../../models/book/genre";
import {ModalService} from "../../../../services/modal/modal.service";
import {ModalComponent} from "../../../modal/modal.component";
import {ModalParams} from "../../../../models/modal/modal-params";
import {NotificationType} from "../../../../models/notification";

@Component({
  selector: 'app-librarian-genres',
  templateUrl: './librarian-genres.component.html',
  styleUrls: ['./librarian-genres.component.css', '../../../../../style.scss']
})
export class LibrarianGenresComponent implements OnInit{

  genres: Genre[] = [];
  constructor(private genreService: GenreService,
              private modalService: ModalService) {
  }

  ngOnInit(): void {
    this.genreService.fetchGenres();
    this.genreService.genreSubject.subscribe(value => {
      this.genres = value;
    })
  }


  editGenre(genre: Genre) {
    const modalParams: ModalParams = {
      title: `Edit genre ${genre.name}`,
      fields: [
        {name: "newName", placeholder: "New genre name", type: "text"}
      ]
    };
    this.modalService.openModal(modalParams).subscribe(value => {
      if(value && value.newName !== undefined){
        this.genreService.updateGenre(genre.name, value.newName).subscribe(response =>{
          genre.name = value.newName;
        });
      }
    });
  }

  deleteGenre(genre: Genre) {
    this.genreService.deleteGenre(genre).subscribe(value =>{
      const index = this.genres.findIndex(g => g.id === genre.id);
      if (index !== undefined && index !== -1) {
        this.genres.splice(index, 1);
      }
    });
  }

  createGenre() {
    const modalParams: ModalParams = {
      title: `Create genre`,
      fields: [
        {name: "name", placeholder: "Genre name", type: "text"}
      ]
    };
    this.modalService.openModal(modalParams).subscribe(value => {
      if(value && value.name){
        this.genreService.createGenre(value.name).subscribe();
      }
    });
  }
}
