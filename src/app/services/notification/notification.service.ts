import { Injectable } from '@angular/core';
import {NotificationType} from "../../models/notification";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationTime = 3000;

  constructor(private snackBar: MatSnackBar) {}

  showNotification(message: string, type: NotificationType = NotificationType.Success, duration: number = this.notificationTime) {
    const config: MatSnackBarConfig = {
      duration,
      panelClass: this.getSnackBarClass(type),
    };

    this.snackBar.open(message, 'Close', config);
  }

  private getSnackBarClass(type: NotificationType): string[] {
    switch (type) {
      case NotificationType.Success:
        return ['success-snackbar'];
      case NotificationType.Error:
        return ['error-snackbar'];
      default:
        return ['success-snackbar'];
    }
  }
}
