import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecipesService } from '../_services/recipes.service';
import { NewRecipe, Recipe } from '../_models/recipe';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { NotificationsService } from '../notifications/notifications.service';
import { RecipeDisplayComponent } from './recipe-display/recipe-display.component';

@Component({
   selector: 'app-recipes',
   templateUrl: './recipes.component.html',
   styleUrls: ['./recipes.component.css'],
   providers: [DialogService],
})
export class RecipesComponent implements OnInit, OnDestroy {
   recipes?: Recipe[] = [];
   oilsListToDisplay?: string[] = [];

   displayRecipeRef?: DynamicDialogRef;

   constructor(
      private recipesService: RecipesService,
      public dialogService: DialogService,
      private notification: NotificationsService
   ) {}

   ngOnInit(): void {
      // this.show();

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

   displayRecipe(recipe: Recipe) {
      this.displayRecipeRef = this.dialogService.open(RecipeDisplayComponent, {
         data: recipe,
         styleClass: 'displayRecipeClass',
         dismissableMask: true,
      });
   }

   show(/* user: UserRoles */) {
      // const initialState = {
      //    username: user.username,
      //    availableRoles: this.availableRoles,
      //    selectedRoles: [...user.roles],
      // };
      // console.log(initialState);

      const ref = this.dialogService.open(AddRecipeComponent, {
         header: 'Añadir Receta',
         styleClass: 'addRecipeClass',
         dismissableMask: true,
      });

      ref.onClose.subscribe({
         next: (newRecipe: NewRecipe) => {
            if (newRecipe) {
               // console.log(newRecipe); {title: '123123', category: 'Belleza', content: 'asdfasf', oilsList: 'Albahaca,Cassia,Copaiba'}

               this.recipesService.addRecipe(newRecipe).subscribe({
                  next: (recetaNueva) => {
                     //no la estoy ocupando hasta que cashee en front

                     this.notification.addNoti({
                        severity: 'success',
                        summary: 'Listo.',
                        detail: 'Receta añadida.',
                     });

                     // mientras casheo ajajajj
                     this.loadRecipes();
                  },
               });

               // ocupo .updateUserRoles solo si los arrays de users son distintos
               // if (!this.arrayEqual(selectedRoles, user.roles)) {
               //    this.adminService
               //       .updateUserRoles(user.username, selectedRoles)
               //       .subscribe({
               //          next: (roles) => (user.roles = roles),
               //       });
               // }
            }
         },
      });
   }

   private arrayEqual(arr1: any[], arr2: any[]) {
      // transformo todo el array en un string
      return JSON.stringify(arr1.sort()) === JSON.stringify(arr2.sort());
   }

   ngOnDestroy(): void {
      // red red cerrar el modal
      this.displayRecipeRef?.close();
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

// export class RecipesComponent implements OnInit, OnDestroy {
//    // oilsList?: Oils[];
//    // selectedOils?: Oils[];
//    // selectedToDisplay?: string[];

//    // starting?: string[] = ['Albahaca', 'Cedro'];

//    ///////////////////
//    recipes?: Recipe[] = [];
//    oilsListToDisplay?: string[] = [];

//    constructor(
//       private recipesService: RecipesService,
//       public dialogService: DialogService
//    ) {}

//    ngOnInit(): void {
//       this.show();
//       // this.oilsList = oilsList;

//       // if (this.starting) {
//       //    this.selectedOils = this.starting?.map((oil) => {
//       //       return { name: oil };
//       //    });

//       //    this.defineList();
//       // }

//       /////////////////////

//       this.loadRecipes();
//    }

//    loadRecipes() {
//       this.recipesService.getRecipes().subscribe({
//          next: (recipes) => {
//             this.recipes = recipes;

//             console.log(this.recipes);
//          },
//       });
//    }

//    // change() {
//    //    this.defineList();
//    // }

//    // onSave() {
//    //    let oils = this.selectedOils?.map((sel) => sel.name);
//    //    console.log(oils);
//    //    // ['Albahaca', 'Alcanforero', 'Alcaravea']
//    // }

//    // defineList() {
//    //    this.selectedToDisplay = this.selectedOils?.map((oils) => oils.name);
//    // }

//    borderColor(category: string) {
//       switch (category) {
//          case 'Bebes':
//             return 'background: linear-gradient(15deg, #06d465, #06b6d4); border-left: 10px solid transparent;';

//          case 'Salud':
//             return 'background: linear-gradient(15deg, #f91616, #f97316); border-left: 10px solid transparent;';

//          case 'Belleza':
//             return 'background: linear-gradient(15deg, #cc63f1, #6366f1); border-left: 10px solid transparent;';

//          default:
//             return 'background: linear-gradient(15deg, #eae91c, #f042f7); border-left: 10px solid transparent;';
//       }
//    }

//    show(/* user: UserRoles */) {
//       // const initialState = {
//       //    username: user.username,
//       //    availableRoles: this.availableRoles,
//       //    selectedRoles: [...user.roles],
//       // };
//       // console.log(initialState);

//       const ref = this.dialogService.open(AddRecipeComponent, {
//          header: 'Añadir Receta',
//          styleClass: 'addRecipeClass',
//          // width: '70%',
//          // dismissableMask: true,
//       });

//       // ref.onClose.subscribe({
//       //    next: (selectedRoles: string[]) => {
//       //       if (selectedRoles) {
//       //          // ocupo .updateUserRoles solo si los arrays de users son distintos
//       //          if (!this.arrayEqual(selectedRoles, user.roles)) {
//       //             this.adminService
//       //                .updateUserRoles(user.username, selectedRoles)
//       //                .subscribe({
//       //                   next: (roles) => (user.roles = roles),
//       //                });
//       //          }
//       //       }
//       //    },
//       // });
//    }

//    private arrayEqual(arr1: any[], arr2: any[]) {
//       // transformo todo el array en un string
//       return JSON.stringify(arr1.sort()) === JSON.stringify(arr2.sort());
//    }

//    ngOnDestroy(): void {
//       // red red cerrar el modal
//    }
// }
