import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';

import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
   declarations: [],
   imports: [
      CommonModule,
      CheckboxModule,
      DialogModule,
      StyleClassModule,
      ButtonModule,
      InputTextModule,
   ],
   exports: [
      CheckboxModule,
      DialogModule,
      StyleClassModule,
      ButtonModule,
      InputTextModule,
   ],
})
export class SharedModule {}
