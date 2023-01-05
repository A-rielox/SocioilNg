import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';

@NgModule({
   declarations: [],
   imports: [
      CommonModule,
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
      FileUploadModule,
      InputNumberModule,
   ],
   exports: [
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
      FileUploadModule,
      InputNumberModule,
   ],
})
export class SharedModule {}
