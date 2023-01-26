import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
   EditedRecipe,
   NewRecipe,
   OilsAndCat,
   Recipe,
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
   registerForm: FormGroup = new FormGroup({});
   recipeToEdit?: Recipe;

   allOils?: OilsAndCat[];
   allCats?: OilsAndCat[];
   selectedOilsToDisplay?: string[];

   constructor(
      private fb: FormBuilder,
      private recipesService: RecipesService,
      private notification: NotificationsService,
      private router: Router
   ) {
      const navigation = this.router.getCurrentNavigation();
      this.recipeToEdit = navigation?.extras.state?.['recipe'];
   }

   ngOnInit(): void {
      this.initializeForm();
      this.allOils = oilsList;
      this.allCats = categoryList;

      //          edicion
      if (this.recipeToEdit) {
         this.componentMode = 'Edit';

         const { id, title, category, content, oilsList } = this.recipeToEdit;

         const selectedOils = oilsList.split(',').map((oil) => {
            return { name: oil };
         });

         this.registerForm.setValue({
            id,
            title,
            category: [{ name: category }],
            content,
            oilsList: selectedOils,
         });

         this.defineList();
      }
   }

   initializeForm() {
      this.registerForm = this.fb.group({
         id: -1,
         title: '',
         content: '',
         oilsList: [],
         category: [],
      });
      // this.registerForm = this.fb.group({
      //    id: [-1, Validators.required],
      //    title: ['', Validators.required],
      //    content: ['', Validators.required],
      //    oilsList: [[], Validators.required],
      //    category: [[], Validators.required],
      // });
   }

   register() {
      console.log(this.registerForm.value);

      const { oilsList, category, title, content, id } =
         this.registerForm.value;

      if (!oilsList || !category || !title || !content) return;

      let oils = oilsList.map((sel: { name: string }) => sel.name).join(',');
      let cat = category[0]?.name;

      if (this.componentMode === 'New') {
         const newRecipe: NewRecipe = {
            title: title,
            category: cat,
            content: content,
            oilsList: oils,
         };

         this.recipesService.addRecipe(newRecipe).subscribe({
            next: (recetaNueva) => {
               //no estoy ocupando la respuesta hasta que cashee en front
               this.callNotificationAndLoadRecipes('Receta añadida.');
               this.registerForm.reset();
            },
         });
      } else if (this.componentMode === 'Edit') {
         const editedRecipe: EditedRecipe = {
            id: id,
            title: title,
            category: cat,
            content: content,
            oilsList: oils,
         };

         console.log('----------editada', editedRecipe);

         this.recipesService.editRecipe(editedRecipe).subscribe({
            next: (_) => {
               this.callNotificationAndLoadRecipes('Receta editada.');
               this.registerForm.reset();
               this.router.navigateByUrl('/recetas');
            },
         });
      }
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
      this.selectedOilsToDisplay = this.registerForm.value.oilsList.map(
         (oil: { name: string }) => oil.name
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
