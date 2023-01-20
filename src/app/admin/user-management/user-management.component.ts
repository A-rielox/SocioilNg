import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { User } from 'src/app/_models/user';
import { AdminService } from 'src/app/_services/admin.service';
import { RolesModalComponent } from 'src/app/modals/roles-modal/roles-modal.component';

interface UserRoles {
   id: number;
   roles: string[];
   username: string;
}

@Component({
   selector: 'app-user-management',
   templateUrl: './user-management.component.html',
   styleUrls: ['./user-management.component.css'],
   providers: [DialogService],
})
export class UserManagementComponent implements OnInit {
   users: User[] = [];
   availableRoles = ['Admin', 'Moderator', 'Member'];

   constructor(
      private adminService: AdminService,
      public dialogService: DialogService
   ) {}

   ngOnInit(): void {
      this.getUsersWithRoles();
   }

   getUsersWithRoles() {
      this.adminService.getUsersWithRoles().subscribe({
         next: (users) => (this.users = users),
      });
   }

   show(user: UserRoles) {
      const initialState = {
         username: user.username,
         availableRoles: this.availableRoles,
         selectedRoles: [...user.roles],
      };
      console.log(initialState);

      const ref = this.dialogService.open(RolesModalComponent, {
         header: 'Editar Roles para ' + user.username,
         data: initialState,
         //  width: '70%'
         dismissableMask: true,
      });

      ref.onClose.subscribe({
         next: (selectedRoles: string[]) => {
            if (selectedRoles) {
               // ocupo .updateUserRoles solo si los arrays de users son distintos
               if (!this.arrayEqual(selectedRoles, user.roles)) {
                  this.adminService
                     .updateUserRoles(user.username, selectedRoles)
                     .subscribe({
                        next: (roles) => (user.roles = roles),
                     });
               }
            }
         },
      });
   }

   private arrayEqual(arr1: any[], arr2: any[]) {
      // transformo todo el array en un string
      return JSON.stringify(arr1.sort()) === JSON.stringify(arr2.sort());
   }
}
