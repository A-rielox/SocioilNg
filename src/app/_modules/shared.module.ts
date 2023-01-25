import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxSpinnerModule } from 'ngx-spinner';
import { TimeagoModule } from 'ngx-timeago';
import {
   TimeagoIntl,
   TimeagoFormatter,
   TimeagoCustomFormatter,
} from 'ngx-timeago';

import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';

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
import { PaginatorModule } from 'primeng/paginator';

import { RadioButtonModule } from 'primeng/radiobutton';
import { MultiSelectModule } from 'primeng/multiselect';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
//
//
//
//
import { PaginatorComponent } from './paginator/paginator.component';

@NgModule({
   declarations: [PaginatorComponent],
   imports: [
      CommonModule,
      NgxSpinnerModule.forRoot({ type: 'pacman' }),
      TimeagoModule.forRoot({
         intl: { provide: TimeagoIntl },
         formatter: {
            provide: TimeagoFormatter,
            useClass: TimeagoCustomFormatter,
         },
      }),
      CheckboxModule,
      DynamicDialogModule,
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
      PaginatorModule,
      RadioButtonModule,
      MultiSelectModule,
      ConfirmPopupModule,
   ],
   exports: [
      NgxSpinnerModule,
      TimeagoModule,
      CheckboxModule,
      DynamicDialogModule,
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
      PaginatorModule,
      RadioButtonModule,
      MultiSelectModule,
      ConfirmPopupModule,
      //
      PaginatorComponent,
   ],
})
export class SharedModule {}
