import {Injectable} from '@angular/core';
import {ApiService} from "../api/api.service";
import {Book} from "../../models/book/book";
import {BookCopy} from "../../models/book/book-copy";
import {NotificationService} from "../notification/notification.service";
import {CopyCondition} from "../../models/book/copy-condition";
import {NotificationType} from "../../models/notification";

@Injectable({
  providedIn: 'root'
})
export class CopyService {

  constructor(private apiService: ApiService,
              private notificationService: NotificationService) { }

    getAllCopies(book: Book) {
        const url = "librarian/copy/get-all";
        const params = {
          "bookId": book.id
        }
        return this.apiService.get<BookCopy[]>(url, params, true, response => {
          console.log(`Fetched copies for book ${book.title}`, response);
        }, (error, statusCode) => {
          console.error(error, statusCode);
        })
    }

  updateCopy(copy: BookCopy, condition:CopyCondition) {
    const url = "librarian/copy/update";
    const params = {
      "copyId": copy.id,
      "condition": CopyCondition[condition]
    }

    return this.apiService.put<BookCopy>(url, {}, params, true, response => {
        this.notificationService.showNotification("Book copy has been updated", NotificationType.Success);
        return response;
    }, error => {
        console.error(error);
    });
  }
}
