import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';
import { NotificationsService } from 'src/app/notifications/notifications.service';

@Component({
   selector: 'app-login-modal',
   templateUrl: './login-modal.component.html',
   styleUrls: ['./login-modal.component.css'],
})
export class LoginModalComponent implements OnInit {
   model: any = {};
   visibleLogin = false;

   constructor(
      private accountService: AccountService,
      private router: Router,
      private notification: NotificationsService
   ) {}

   ngOnInit(): void {
      // yellow QUITAR
      this.model.username = 'lisa';
      this.model.password = 'P@ssword1';
      // yellow QUITAR
   }

   openLogin() {
      this.visibleLogin = !this.visibleLogin;
   }

   login() {
      this.accountService.login(this.model).subscribe({
         next: () => {
            this.router.navigateByUrl('/miembros');

            this.notification.addNoti({
               severity: 'success',
               summary: 'Bienvenida.',
               detail: 'Que bueno tenerte de vuelta.',
            });
         },
         error: () => {
            // ahora mando el error desde el interceptor
            // this.notification.addNoti({
            //    severity: 'error',
            //    summary: 'Error al entrar.',
            //    detail: err.error,
            // });
         },
      });

      this.visibleLogin = false;
   }
}
