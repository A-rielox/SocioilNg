import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { User } from 'src/app/_models/user';
import { AdminService } from 'src/app/_services/admin.service';
import { RolesModalComponent } from 'src/app/modals/roles-modal/roles-modal.component';

@Component({
   selector: 'app-user-management',
   templateUrl: './user-management.component.html',
   styleUrls: ['./user-management.component.css'],
   providers: [DialogService],
})
export class UserManagementComponent implements OnInit {
   users: User[] = [];

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

   show() {
      const ref = this.dialogService.open(RolesModalComponent, {
         header: 'Editar Roles',
         data: {
            list: ['primero', 'segundo', 'tercero'],
            title: 'titulazooo',
         },
         //  width: '70%'
         dismissableMask: true,
      });
   }
}
