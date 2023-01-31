import { Component } from '@angular/core';
import { NotificationService } from '../services/notification/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent {
  constructor(protected notificationService: NotificationService) {}
}
