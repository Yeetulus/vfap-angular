import { Component } from '@angular/core';
import {NotificationService} from "./services/notification/notification.service";
import {Notification} from "./models/notification";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  notifications: Notification[] = [];
  title = 'vfap-project';

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService.notifications$.subscribe((notifications) => {
      this.notifications = notifications;
    });
  }

  clearNotification(index: number) {
    this.notificationService.clearNotification(index);
  }
}
