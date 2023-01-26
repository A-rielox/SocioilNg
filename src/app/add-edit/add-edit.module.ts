import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { AddPostComponent } from './add-post/add-post.component';
import { AddEditComponent } from './add-edit.component';
import { SharedModule } from '../_modules/shared.module';

import { FormsModule } from '@angular/forms';

@NgModule({
   declarations: [AddRecipeComponent, AddPostComponent, AddEditComponent],
   imports: [CommonModule, SharedModule, FormsModule],
   exports: [AddRecipeComponent, AddPostComponent, AddEditComponent],
})
export class AddEditModule {}
