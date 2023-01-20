import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable({
   providedIn: 'root',
})
export class AdminGuard implements CanActivate {
   constructor(
      private accountService: AccountService,
      private notification: NotificationsService
   ) {}

   canActivate(): Observable<boolean> {
      return this.accountService.currentUser$.pipe(
         map((user) => {
            if (!user) return false;

            if (
               user.roles.includes('Admin') ||
               user.roles.includes('Moderator')
            ) {
               return true;
            } else {
               this.notification.addNoti({
                  severity: 'error',
                  summary: 'No tienes permisos para entrar.',
                  detail: '',
               });

               return false;
            }
         })
      );
   }
}

// LOS ROUTE-GUARDS SE SUSCRIBEN Y UNSUBSCRIBE SOLOS 😎
