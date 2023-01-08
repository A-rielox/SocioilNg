import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';
import { NotificationsService } from '../notifications/notifications.service';
import { MenuItem } from 'primeng/api';

@Component({
   selector: 'app-nav',
   templateUrl: './nav.componentx.html',
   styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
   items: MenuItem[] = [];

   navItems: MenuItem[] = [];

   constructor(
      public accountService: AccountService,
      private router: Router,
      private notification: NotificationsService
   ) {}

   ngOnInit(): void {
      this.items = [
         {
            label: 'Editar Perfil',
            icon: 'pi pi-cog',
            routerLink: ['/miembro/edit'],
            // command: () => {
            //   this.update();  routerLink="/miembro/edit"
            // },
         },
         {
            label: 'Salir',
            icon: 'pi pi-sign-out',
            command: () => {
               //   this.delete();
               this.logout();
            },
         },
      ];

      this.navItems = [
         {
            label: 'Home',
            icon: 'pi pi-home',
            routerLink: ['/'],
         },
         {
            label: 'Salir',
            icon: 'pi pi-sign-out',
         },
      ];
   }

   logout() {
      this.accountService.logout();
      this.router.navigateByUrl('/');

      this.notification.addNoti({
         severity: 'info',
         summary: 'Nos vemos.',
         detail: 'Te esperamos de vuelta.',
      });
   }

   aClass() {
      return 'flex h-full px-6 p-3 lg:px-3 lg:py-2 align-items-center text-600 hover:text-900 border-left-2 lg:border-bottom-2 lg:border-left-none border-transparent hover:border-primary font-medium cursor-pointer transition-colors transition-duration-150';
   }
   aClass2() {
      return 'flex h-full px-6 p-3 lg:px-3 lg:py-2 align-items-center border-left-2 lg:border-bottom-2 lg:border-left-none border-transparent hover:border-primary font-medium cursor-pointer transition-colors transition-duration-150';
   }
}
