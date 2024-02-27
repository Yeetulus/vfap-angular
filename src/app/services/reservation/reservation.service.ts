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
      this.notificationService.showNotification("Cannot create reservation", NotificationType.Error);
      return error;
    })
  }
}
