import {Injectable} from '@angular/core';
import {Genre} from "../../models/book/genre";
import {BehaviorSubject} from "rxjs";
import {ApiService} from "../api/api.service";
import {NotificationService} from "../notification/notification.service";
import {NotificationType} from "../../models/notification";

@Injectable({
  providedIn: 'root'
})
export class GenreService{

  url = "library/"
  genreSubject: BehaviorSubject<Genre[]> = new BehaviorSubject<Genre[]>([]);

  constructor(private apiService: ApiService,
              private notificationService: NotificationService) {
  }

  fetchGenres(){
    const url = `${this.url}genres`;
    this.apiService.get<Genre[]>(
      url,
      undefined,
      false,
      (response : Genre[]) => {
        this.genreSubject.next(response);
        console.log("Genres: ", response);
    }, (error, statusCode) => {
        console.log("Cannot get genres: " + error);
    }).subscribe();
  }

  updateGenres(id: number, show: boolean) {
    let genre = this.genreSubject.value.find(g => g.id === id);
    if(genre){
      genre.show = show;
      this.genreSubject.next(this.genreSubject.value);
    }
  }

  updateGenre(name: string, newName: any) {
    const url = "librarian/genre/update";
    const params = {
      "genreName": name,
      "newName": newName
    };
    return this.apiService.put<Genre>(url, {}, params, true, response => {
      this.notificationService.showNotification(`Updated genre name to ${newName}`, NotificationType.Success);
      return response;
    }, error => {
      this.notificationService.showNotification(`Could not update genre ${name}`, NotificationType.Error);
      console.error(error);
    }, true);
  }

  deleteGenre(genre: Genre) {
    const url = "librarian/genre/delete";
    const params = {
      "id": genre.id
    };

    return this.apiService.delete<boolean>(url, params, true, response => {
      this.notificationService.showNotification(`Deleted genre ${genre.name}`, NotificationType.Success);
      return true;
    }, error => {
      this.notificationService.showNotification(`Could not delete genre ${genre.name}`, NotificationType.Error);
    }, true);
  }

  createGenre(name: string) {
    const url = "librarian/genre/create";
    const params = {
      "genreName": name,
    };
    return this.apiService.post<Genre>(url, {}, params, true, response => {
      this.notificationService.showNotification(`Created new genre ${name}`, NotificationType.Success);
      this.genreSubject.next([...this.genreSubject.value, response]);
      return response;
    }, (error) => {
      console.error(error);
    }, true);
  }

  getGenreIds() {
      let genreIds:number[] = [];
      this.genreSubject.value.forEach(g => {
        if(g.show){
          genreIds.push(g.id);
        }
      });
      if(genreIds.length === 0) return null;
      return genreIds;
    }

}
