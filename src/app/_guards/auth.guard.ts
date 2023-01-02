import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable({
   providedIn: 'root',
})
export class AuthGuard implements CanActivate {
   constructor(
      private accountService: AccountService,
      private notification: NotificationsService
   ) {}
   canActivate(): Observable<boolean> {
      return this.accountService.currentUser$.pipe(
         // take(1),
         map((user) => {
            if (user) {
               return true;
            } else {
               this.notification.addNoti({
                  severity: 'warn',
                  summary: 'Lo sentimos.',
                  detail: 'Solo usuarios registrados.',
               });

               return false;
            }
         })
      );
   }
}
