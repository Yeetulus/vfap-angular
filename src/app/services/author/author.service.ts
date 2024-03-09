import {Injectable} from '@angular/core';
import {ApiService} from "../api/api.service";
import {BehaviorSubject} from "rxjs";
import {Author} from "../../models/book/author";
import {NotificationService} from "../notification/notification.service";
import {NotificationType} from "../../models/notification";

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  public authorSubject: BehaviorSubject<Author[]> = new BehaviorSubject<Author[]>([]);
  constructor(private apiService: ApiService,
              private notificationService: NotificationService) { }

  public fetchAuthors(){
    const url = "librarian/author/get-all"
    this.apiService.get<Author[]>(url, {}, true, response =>{
      this.authorSubject.next(response);
    }, error => {
      console.error(error);
    }, true).subscribe();
  }

  delete(author: Author) {
    const url = "librarian/author/delete";
    const params ={
      "id": author.id
    };
    console.log(author);

    return this.apiService.delete<boolean>(url, params, true, response =>{
      const index = this.authorSubject.value.findIndex(_author => _author.id === author.id);
      if (index !== undefined && index !== -1) {
        let authors = this.authorSubject.value;
        authors.splice(index, 1);
        this.authorSubject.next(authors);
        this.notificationService.showNotification(`Deleted author ${author.name}`);
      }
    }, error => {
      this.notificationService.showNotification(`Could not delete author ${author.name}`, NotificationType.Error);
      console.error(error);
    }, true);
  }

  update(author:Author, newName: any) {
    const url = "librarian/author/update";
    const params ={
      "id": author.id,
      "newName": newName
    };
    return this.apiService.put<Author>(url, {}, params, true, response =>{
      const updatedAuthor: Author = response;
      let authors = this.authorSubject.value;

      const index = authors.findIndex(author => author.id === updatedAuthor.id);
      authors[index].name = newName;
      if (index !== -1) {
        this.authorSubject.next(authors);
        this.notificationService.showNotification(`Updated author's name to ${newName}`);
      }
      else this.notificationService.showNotification(`Could not update author ${author.name}`, NotificationType.Error);
    }, error => {
      console.error(error);
      this.notificationService.showNotification(`Could not update author ${author.name}`, NotificationType.Error);
    }, true);
  }

  create(name: string) {
    const url = "librarian/author/create";
    const params ={
      "name": name,
    };
    return this.apiService.post<Author>(url, {}, params, true, response =>{
      this.notificationService.showNotification(`Created new author ${response.name}`)
      this.authorSubject.next([...this.authorSubject.value, response]);
    }, error => {
      this.notificationService.showNotification(`Could not create new author`, NotificationType.Error)
      console.error(error);
    }, true);
  }
}
