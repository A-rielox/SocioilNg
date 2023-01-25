import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { take } from 'rxjs';

@Directive({
   selector: '[appIsOwnerOrAdmin]',
})
export class IsOwnerOrAdminDirective {
   user: User = {} as User;

   @Input() set appIsOwnerOrAdmin(owner: string) {
      if (this.user.userName === owner || this.user.roles.includes('Admin')) {
         this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
         this.viewContainerRef.clear();
      }
   }

   constructor(
      private viewContainerRef: ViewContainerRef,
      private templateRef: TemplateRef<any>,
      private accountService: AccountService
   ) {
      this.accountService.currentUser$.pipe(take(1)).subscribe({
         next: (user) => {
            if (user) {
               this.user = user;
            }
         },
      });
   }
}
