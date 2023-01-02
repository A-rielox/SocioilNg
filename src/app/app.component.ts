import { Component, OnInit } from '@angular/core';

import { PrimeNGConfig } from 'primeng/api';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
   constructor(
      private primengConfig: PrimeNGConfig,
      private accountService: AccountService
   ) {}

   ngOnInit(): void {
      this.primengConfig.ripple = true;

      // this.getUsers();
      this.setCurrentUser();
   }

   setCurrentUser() {
      const userString = localStorage.getItem('user');
      if (!userString) return;

      const user: User = JSON.parse(userString);

      //this.accountService.setCurrentUser me lo vuelve a poner en el local-storage
      this.accountService.setCurrentUser(user);
   }
}
