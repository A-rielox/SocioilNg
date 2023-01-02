import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TheNotificationComponent } from './the-notification/the-notification.component';

import { ToastModule } from 'primeng/toast';

@NgModule({
   declarations: [TheNotificationComponent],
   imports: [CommonModule, ToastModule],
   exports: [TheNotificationComponent],
})
export class NotificationsModule {}
