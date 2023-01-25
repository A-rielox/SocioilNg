import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Recipe } from 'src/app/_models/recipe';
import { AddRecipeComponent } from '../add-recipe/add-recipe.component';

@Component({
   selector: 'app-recipe-display',
   templateUrl: './recipe-display.component.html',
   styleUrls: ['./recipe-display.component.css'],
})
export class RecipeDisplayComponent implements OnInit {
   recipe?: Recipe;

   constructor(
      public dialogService: DialogService,
      public ref: DynamicDialogRef,
      public config: DynamicDialogConfig
   ) {}

   ngOnInit(): void {
      this.recipe = this.config.data;
   }

   show() {
      // p' cerra el RecipeDisplayComponent antes de abrir el de editar
      this.ref.close();

      const ref = this.dialogService.open(AddRecipeComponent, {
         data: this.recipe,
         header: 'Añadir Receta',
         styleClass: 'addRecipeClass',
      });
   }

   borderColor(category: string) {
      switch (category) {
         case 'Bebes':
            return 'background: linear-gradient(15deg, #06d465, #06b6d4); border-left: 10px solid transparent;';

         case 'Salud':
            return 'background: linear-gradient(15deg, #f91616, #f97316); border-left: 10px solid transparent;';

         case 'Belleza':
            return 'background: linear-gradient(15deg, #cc63f1, #6366f1); border-left: 10px solid transparent;';

         default:
            return 'background: linear-gradient(15deg, #eae91c, #6d1e70); border-left: 10px solid transparent;';
      }
   }
}
