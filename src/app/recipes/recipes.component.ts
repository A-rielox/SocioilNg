import { Component, OnInit } from '@angular/core';
import { oilsList } from './optionLists';
import { RecipesService } from '../_services/recipes.service';
import { Recipe } from '../_models/recipe';

interface Oils {
   name: string;
   // code: string;
}

@Component({
   selector: 'app-recipes',
   templateUrl: './recipes.component.html',
   styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {
   oilsList?: Oils[];
   selectedOils?: Oils[];
   selectedToDisplay?: string[];

   starting?: string[] = ['Albahaca', 'Cedro'];

   ///////////////////
   recipes?: Recipe[] = [];
   oilsListToDisplay?: string[] = [];

   constructor(private recipesService: RecipesService) {}

   ngOnInit(): void {
      this.oilsList = oilsList;

      if (this.starting) {
         this.selectedOils = this.starting?.map((oil) => {
            return { name: oil };
         });

         this.defineList();
      }

      /////////////////////

      this.loadRecipes();
   }

   loadRecipes() {
      this.recipesService.getRecipes().subscribe({
         next: (recipes) => {
            this.recipes = recipes;

            console.log(this.recipes);
         },
      });
   }

   change() {
      this.defineList();
   }

   onSave() {
      let oils = this.selectedOils?.map((sel) => sel.name);
      console.log(oils);
      // ['Albahaca', 'Alcanforero', 'Alcaravea']
   }

   defineList() {
      this.selectedToDisplay = this.selectedOils?.map((oils) => oils.name);
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
            return 'background: linear-gradient(15deg, #eae91c, #f042f7); border-left: 10px solid transparent;';
      }
   }
}
