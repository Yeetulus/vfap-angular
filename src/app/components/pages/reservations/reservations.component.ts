import {Component, OnInit} from '@angular/core';
import {Reservation} from "../../../models/booking/reservation";
import {ReservationService} from "../../../services/reservation/reservation.service";
import {BookService} from "../../../services/book/book.service";
import {Book} from "../../../models/book/book";

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css', '../../../../style.scss']
})
export class ReservationsComponent implements OnInit{

  reservations: Reservation[] = [];

  constructor(private reservationService: ReservationService,
              private bookService: BookService) {

  }

  ngOnInit(): void {
    this.reservationService.getReservations().subscribe(value =>{
      this.reservations = value;
    });
  }

  navigateToBook(book: Book) {
    this.bookService.navigateToBookDetail(book);
  }
  navigateToBooksOfAuthor(name: string) {
    this.bookService.searchBooks(name, undefined);
  }

  cancelReservation(reservation: Reservation) {
    this.reservationService.cancelReservation(reservation).subscribe(value => {
      const index = this.reservations.indexOf(reservation);
      if (index !== -1) {
        this.reservations.splice(index, 1);
     }
    });
  }
}
