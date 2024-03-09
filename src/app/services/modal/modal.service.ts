import { Injectable } from '@angular/core';
import {ModalComponent} from "../../components/modal/modal.component";
import {Observable} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ModalParams} from "../../models/modal/modal-params";

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(private dialog: MatDialog) {}

  openModal(params: ModalParams): Observable<any> {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: "350px",
      data: params
    });

    return dialogRef.afterClosed();
  }
}
