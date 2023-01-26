import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
   EditedRecipe,
   NewRecipe,
   OilsAndCat,
   RecipeForm,
} from 'src/app/_models/recipe';
import { RecipesService } from 'src/app/_services/recipes.service';
import { NotificationsService } from 'src/app/notifications/notifications.service';
import { categoryList, oilsList } from 'src/app/recipes/optionLists';

@Component({
   selector: 'app-add-recipe',
   templateUrl: './add-recipe.component.html',
   styleUrls: ['./add-recipe.component.css'],
})
export class AddRecipeComponent implements OnInit {
   componentMode: string = 'New';
   recipeForm: RecipeForm = {} as RecipeForm;

   ////////////////
   // oilsList?: OilsAndCat[];
   // startingOils?: string[] = [];
   startingCat?: string[] = [];

   selectedOilsToDisplay?: string[];
   /////////////
   categoryList?: OilsAndCat[];
   selectedCategory?: OilsAndCat[];

   selectedCategoryToDisplay?: string[];

   //---------------------
   @ViewChild('form') form: NgForm = {} as NgForm;
   oilsList?: OilsAndCat[];
   oils?: string[] = [];

   constructor(
      private recipesService: RecipesService,
      private notification: NotificationsService
   ) {}

   ngOnInit(): void {
      this.oilsList = oilsList;
      this.categoryList = categoryList;
   }

   onSave() {
      const { oilsList, category, title, content } = this.recipeForm;

      if (!oilsList || !category || !title || !content) return;

      let oils = oilsList.map((sel) => sel.name).join(',');
      let cat = category[0]?.name;

      if (this.componentMode === 'New') {
         const newRecipe: NewRecipe = {
            title: title,
            category: cat,
            content: content,
            oilsList: oils,
         };

         console.log(newRecipe, 'newwwwwwwwwwwwwww');

         // la mando el componente recipes.component.ts
         // this.ref.close(newRecipe); ----------------

         this.sendNewRecipe(newRecipe);
      } else if (this.componentMode === 'Edit') {
         const editedRecipe: EditedRecipe = {
            id: this.recipeForm.id,
            title: title,
            category: cat,
            content: content,
            oilsList: oils,
         };

         console.log(editedRecipe, 'edittttttttt');

         // la mando el componente recipes.component.ts
         // this.ref.close(editedRecipe); -----------------

         this.sendEditRecipe(editedRecipe);
      }
   }

   sendNewRecipe(newRecipe: NewRecipe) {
      this.recipesService.addRecipe(newRecipe).subscribe({
         next: (recetaNueva) => {
            //no estoy ocupando la respuesta hasta que cashee en front
            this.callNotificationAndLoadRecipes('Receta añadida.');
         },
      });
   }

   sendEditRecipe(editedRecipe: EditedRecipe) {
      this.recipesService.editRecipe(editedRecipe).subscribe({
         next: (_) => {
            this.callNotificationAndLoadRecipes('Receta editada.');
         },
      });
   }

   callNotificationAndLoadRecipes(detail: string) {
      this.notification.addNoti({
         severity: 'success',
         summary: 'Listo.',
         detail: detail,
      });
   }

   change() {
      this.defineList();
   }

   defineList() {
      console.log(this.form.value);

      this.selectedOilsToDisplay = this.form.value.oils.map(
         (oils: { name: string }) => oils.name
      );
   }
}

/* 

import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
   EditedRecipe,
   NewRecipe,
   OilsAndCat,
   RecipeForm,
} from 'src/app/_models/recipe';
import { RecipesService } from 'src/app/_services/recipes.service';
import { NotificationsService } from 'src/app/notifications/notifications.service';
import { categoryList, oilsList } from 'src/app/recipes/optionLists';

@Component({
   selector: 'app-add-recipe',
   templateUrl: './add-recipe.component.html',
   styleUrls: ['./add-recipe.component.css'],
})
export class AddRecipeComponent implements OnInit {
   componentMode: string = 'New';
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

   //---------------------
   @ViewChild('form') form: NgForm = {} as NgForm;

   constructor(
      private recipesService: RecipesService,
      private notification: NotificationsService
   ) {}

   ngOnInit(): void {
      this.oilsList = oilsList;
      this.categoryList = categoryList;
   }

   onSave() {
      const { oilsList, category, title, content } = this.recipeForm;

      if (!oilsList || !category || !title || !content) return;

      let oils = oilsList.map((sel) => sel.name).join(',');
      let cat = category[0]?.name;

      if (this.componentMode === 'New') {
         const newRecipe: NewRecipe = {
            title: title,
            category: cat,
            content: content,
            oilsList: oils,
         };

         console.log(newRecipe, 'newwwwwwwwwwwwwww');

         // la mando el componente recipes.component.ts
         // this.ref.close(newRecipe); ----------------

         this.sendNewRecipe(newRecipe);
      } else if (this.componentMode === 'Edit') {
         const editedRecipe: EditedRecipe = {
            id: this.recipeForm.id,
            title: title,
            category: cat,
            content: content,
            oilsList: oils,
         };

         console.log(editedRecipe, 'edittttttttt');

         // la mando el componente recipes.component.ts
         // this.ref.close(editedRecipe); -----------------

         this.sendEditRecipe(editedRecipe);
      }
   }

   sendNewRecipe(newRecipe: NewRecipe) {
      this.recipesService.addRecipe(newRecipe).subscribe({
         next: (recetaNueva) => {
            //no estoy ocupando la respuesta hasta que cashee en front
            this.callNotificationAndLoadRecipes('Receta añadida.');
         },
      });
   }

   sendEditRecipe(editedRecipe: EditedRecipe) {
      this.recipesService.editRecipe(editedRecipe).subscribe({
         next: (_) => {
            this.callNotificationAndLoadRecipes('Receta editada.');
         },
      });
   }

   callNotificationAndLoadRecipes(detail: string) {
      this.notification.addNoti({
         severity: 'success',
         summary: 'Listo.',
         detail: detail,
      });
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

*/
