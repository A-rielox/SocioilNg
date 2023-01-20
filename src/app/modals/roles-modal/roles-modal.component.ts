import { Component, Input, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
   selector: 'app-roles-modal',
   templateUrl: './roles-modal.component.html',
   styleUrls: ['./roles-modal.component.css'],
})
export class RolesModalComponent implements OnInit {
   username = '';
   availableRoles: string[] = [];
   selectedRoles: string[] = [];

   //////////////////
   animal = 0;
   //
   tier1 = 0;
   value = 0;
   //////////////////

   constructor(
      public ref: DynamicDialogRef,
      public config: DynamicDialogConfig
   ) {}

   ngOnInit(): void {
      this.availableRoles = this.config.data.availableRoles;
      this.selectedRoles = this.config.data.selectedRoles;
      this.username = this.config.data.username; // parece q NO se usa
      // list: this.config.data.list;
   }

   // para actualizar los checkboxes con lo que venga
   updateChecked(checkedValue: string) {
      const index = this.selectedRoles.indexOf(checkedValue);
      index !== -1
         ? this.selectedRoles.splice(index, 1)
         : this.selectedRoles.push(checkedValue);
   }

   closeD() {
      console.log(this.selectedRoles);

      this.ref.close(this.selectedRoles);
   }
}
