import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Command, NotificationsService } from '../notifications.service';

@Component({
   selector: 'app-the-notification',
   templateUrl: './the-notification.component.html',
   styleUrls: ['./the-notification.component.css'],
   providers: [MessageService],
})
export class TheNotificationComponent implements OnInit {
   message: Command | undefined;

   constructor(
      private messageService: MessageService,
      private notificationsService: NotificationsService
   ) {
      this.notificationsService.messagesOutput.subscribe({
         next: (msg) => {
            this.message = msg;
            this.showSuccess();
         },
      });
   }

   ngOnInit(): void {}

   showSuccess() {
      if (this.message) {
         this.messageService.add({
            severity: this.message.severity,
            summary: this.message.summary,
            detail: this.message.detail,
            life: 5000,
         });
      }
   }
}
