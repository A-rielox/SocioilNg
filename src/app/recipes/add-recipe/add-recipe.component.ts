import { Component, OnInit } from '@angular/core';
import { oilsList, categoryList } from '../optionLists';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { NewRecipe, OilsAndCat, RecipeForm } from 'src/app/_models/recipe';

// breakpoint en style.css
@Component({
   selector: 'app-add-recipe',
   templateUrl: './add-recipe.component.html',
   styleUrls: ['./add-recipe.component.css'],
})
export class AddRecipeComponent implements OnInit {
   recipeForm: RecipeForm = {} as RecipeForm;

   ////////////////
   oilsList?: OilsAndCat[];
   startingOils?: string[] = [];
   startingCat?: string[] = [];

   selectedOilsToDisplay?: string[];
   /////////////
   categoryList?: OilsAndCat[];
   selectedCategory?: OilsAndCat[];

   selectedCategoryToDisplay?: string[];
   // startingCategory?: string[] = ['Albahaca', 'Cedro'];

   constructor(
      public ref: DynamicDialogRef,
      public config: DynamicDialogConfig
   ) {}

   ngOnInit(): void {
      this.oilsList = oilsList;
      this.categoryList = categoryList;

      if (this.config.data) {
         //
         //                               viene a editar
         //

         this.startingOils = this.config.data.oilsList.split(',');
         this.startingCat = [this.config.data.category];

         if (this.startingOils) {
            this.recipeForm.oilsList = this.startingOils.map((oil) => {
               return { name: oil };
            });

            this.defineList();
         }

         if (this.startingCat) {
            this.recipeForm.category = this.startingCat.map((cat) => {
               return { name: cat };
            });
         }

         this.recipeForm.title = this.config.data.title;
         this.recipeForm.content = this.config.data.content;
      }
   }

   onSave() {
      console.log(this.recipeForm);
      const { oilsList, category, title, content } = this.recipeForm;

      if (!oilsList || !category || !title || !content) return;

      let oils = oilsList.map((sel) => sel.name).join(',');
      let cat = category[0]?.name;

      const newRecipe: NewRecipe = {
         title: title,
         category: cat,
         content: content,
         oilsList: oils,
      };

      // la mando el componente recipes.component.ts
      this.ref.close(newRecipe);
   }

   change() {
      this.defineList();
   }

   defineList() {
      this.selectedOilsToDisplay = this.recipeForm.oilsList.map(
         (oils) => oils.name
      );
   }
}
