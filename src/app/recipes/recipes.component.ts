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
            /*
            [
               {
                  "id": 3,
                  "content": "Test primera receta 1111",
                  "oilsList": "burnes,ocote,cilantro",
                  "createdById": 1,
                  "createdByUsername": "lisa",
                  "createdByPhotoUrl": "https://randomuser.me/api/portraits/women/54.jpg"
               },
               {
                  "id": 4,
                  "content": "Test receta PORTER 222222",
                  "oilsList": "burnes,ocote,cilantro",
                  "createdById": 7,
                  "createdByUsername": "porter",
                  "createdByPhotoUrl": "https://randomuser.me/api/portraits/men/87.jpg"
               },
               {
                  "id": 5,
                  "content": "Test receta Lisa 33333",
                  "oilsList": "Menta,Limon",
                  "createdById": 1,
                  "createdByUsername": "lisa",
                  "createdByPhotoUrl": "https://randomuser.me/api/portraits/women/54.jpg"
               }
            ]
            */
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
}
