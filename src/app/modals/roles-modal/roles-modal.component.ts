import { Component, Input, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
   selector: 'app-roles-modal',
   templateUrl: './roles-modal.component.html',
   styleUrls: ['./roles-modal.component.css'],
})
export class RolesModalComponent implements OnInit {
   title = '';
   list?: string[];

   animal = 0;

   tier1 = 0;
   value = 0;

   constructor(
      public ref: DynamicDialogRef,
      public config: DynamicDialogConfig
   ) {}

   ngOnInit(): void {
      this.list = this.config.data.list;
      // list: this.config.data.list;
   }

   closeD() {
      this.ref.close();
   }
}
