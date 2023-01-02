import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';
import { NotificationsService } from 'src/app/notifications/notifications.service';

@Component({
   selector: 'app-register-modal',
   templateUrl: './register-modal.component.html',
   styleUrls: ['./register-modal.component.css'],
})
export class RegisterModalComponent implements OnInit {
   model: any = {};
   visibleRegister = false;

   constructor(
      private accountService: AccountService,
      private router: Router,
      private notification: NotificationsService
   ) {}

   ngOnInit(): void {}

   openRegister() {
      this.visibleRegister = !this.visibleRegister;
   }

   register() {
      this.visibleRegister = false;

      this.accountService.register(this.model).subscribe({
         next: () => {
            this.router.navigateByUrl('/miembros');

            this.notification.addNoti({
               severity: 'success',
               summary: 'Bienvenido.',
               detail: 'Que bueno tenerte.',
            });
         },
         error: (error) => {
            console.log(error);

            this.notification.addNoti({
               severity: 'error',
               summary: 'Error al entrar.',
               detail: error.error,
            });
         },
      });
   }
}
