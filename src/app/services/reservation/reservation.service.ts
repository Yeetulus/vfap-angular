import {Injectable} from '@angular/core';
import {ApiService} from "../api/api.service";
import {Reservation} from "../../models/booking/reservation";
import {NotificationService} from "../notification/notification.service";
import {NotificationType} from "../../models/notification";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private apiService: ApiService,
              private notificationService: NotificationService) { }

  createReservation(bookId:number){
    const url = "member/reservation/create"
    const params = {"bookId": bookId.toString()}
    return this.apiService.post<Reservation>(url, {}, params, true, response => {
      console.log("Created reservation", response);
      this.notificationService.showNotification("Created reservation", NotificationType.Success);
      return response;
    }, (error, statusCode) => {
      console.log(statusCode, "Error creating reservation", error);
      this.notificationService.showNotification(error.error, NotificationType.Error);
      return error;
    }, true);
  }

  getReservations() {
    const url = "member/reservation/get-all";
    return this.apiService.get<Reservation[]>(url, {}, true, response => {
      console.log("Fetched reservations", response);
    }, error => {
      console.log("Error fetching reservations", error);
    }, true);

  }

  cancelReservation(reservation: Reservation) {
    const url = "member/reservation/cancel";
    const params = {
      "bookId": reservation.book.id.toString()
    }
    return this.apiService.delete<boolean>(url, params, true, response => {
      this.notificationService.showNotification("Reservations has been canceled", NotificationType.Success);
      return true;
    }, error => {
      this.notificationService.showNotification("Cannot cancel reservation", NotificationType.Error);
      return false;
    }, true);

  }
}
