import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { AddPostComponent } from './add-post/add-post.component';
import { AddEditComponent } from './add-edit.component';
// import { TextInputComponent } from './text-input/text-input.component';
import { SharedModule } from '../_modules/shared.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EditorModule } from 'primeng/editor';

@NgModule({
   declarations: [
      AddRecipeComponent,
      AddPostComponent,
      AddEditComponent,
      // TextInputComponent,
   ],
   imports: [
      CommonModule,
      SharedModule,
      FormsModule,
      ReactiveFormsModule,
      EditorModule,
   ],
   exports: [AddRecipeComponent, AddPostComponent, AddEditComponent],
})
export class AddEditModule {}
