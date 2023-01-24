import { Component, OnInit } from '@angular/core';
import { oilsList, categoryList } from '../optionLists';

interface OilsAndCat {
   name: string;
   // code: string;
}
// breakpoint en style.css
@Component({
   selector: 'app-add-recipe',
   templateUrl: './add-recipe.component.html',
   styleUrls: ['./add-recipe.component.css'],
})
export class AddRecipeComponent implements OnInit {
   oilsList?: OilsAndCat[];
   selectedOils?: OilsAndCat[];

   selectedOilsToDisplay?: string[];
   startingOils?: string[] = ['Albahaca', 'Cedro'];

   /////////////

   categoryList?: OilsAndCat[];
   selectedCategory?: OilsAndCat[];

   selectedCategoryToDisplay?: string[];
   // startingCategory?: string[] = ['Albahaca', 'Cedro'];

   constructor() {}

   ngOnInit(): void {
      this.oilsList = oilsList;
      this.categoryList = categoryList;

      if (this.startingOils) {
         this.selectedOils = this.startingOils?.map((oil) => {
            return { name: oil };
         });

         this.defineList();
      }
   }

   onSave() {
      let oils = this.selectedOils?.map((sel) => sel.name);
      console.log(oils);
      // ['Albahaca', 'Alcanforero', 'Alcaravea']
   }

   change() {
      this.defineList();
   }

   defineList() {
      this.selectedOilsToDisplay = this.selectedOils?.map((oils) => oils.name);
   }
}
