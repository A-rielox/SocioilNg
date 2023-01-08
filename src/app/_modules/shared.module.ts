import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxSpinnerModule } from 'ngx-spinner';

import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';

import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { DividerModule } from 'primeng/divider';
// import { ImageModule } from 'primeng/image';
import { GalleriaModule } from 'primeng/galleria';
import { DropdownModule } from 'primeng/dropdown';

import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FileUploadModule } from 'ng2-file-upload';
import { TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { AvatarModule } from 'primeng/avatar';

import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';

@NgModule({
   declarations: [],
   imports: [
      CommonModule,
      NgxSpinnerModule.forRoot({ type: 'pacman' }),
      CheckboxModule,
      DialogModule,
      StyleClassModule,
      ButtonModule,
      InputTextModule,
      TabViewModule,
      DividerModule,
      // ImageModule,
      GalleriaModule,
      DropdownModule,
      InputTextareaModule,
      InputSwitchModule,
      InputNumberModule,
      SelectButtonModule,
      FileUploadModule,
      TableModule,
      ProgressBarModule,
      AvatarModule,
      MenuModule,
      MenubarModule,
   ],
   exports: [
      NgxSpinnerModule,
      CheckboxModule,
      DialogModule,
      StyleClassModule,
      ButtonModule,
      InputTextModule,
      TabViewModule,
      DividerModule,
      // ImageModule,
      GalleriaModule,
      DropdownModule,
      InputTextareaModule,
      InputSwitchModule,
      InputNumberModule,
      SelectButtonModule,
      FileUploadModule,
      TableModule,
      ProgressBarModule,
      AvatarModule,
      MenuModule,
      MenubarModule,
   ],
})
export class SharedModule {}
