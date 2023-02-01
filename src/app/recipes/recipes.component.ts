import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecipesService } from '../_services/recipes.service';
import { Recipe } from '../_models/recipe';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RecipeDisplayComponent } from './recipe-display/recipe-display.component';
import { Pagination } from '../_models/pagination';
import { RecipeParams } from '../_models/recipeParams';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { take } from 'rxjs/operators';

interface RecipesToDisplay {
   name: string;
   label: string;
}

interface CloseModal {
   por: string;
   id: number; // receta o post
}

@Component({
   selector: 'app-recipes',
   templateUrl: './recipes.component.html',
   styleUrls: ['./recipes.component.css'],
   providers: [DialogService],
})
export class RecipesComponent implements OnInit, OnDestroy {
   recipes?: Recipe[] = [];
   pagination: Pagination | undefined; // p'paginator en .html
   recipeParams: RecipeParams | undefined; // aqui estan los filtros

   refDisplayRecipe?: DynamicDialogRef;

   ///////
   user: User | undefined; // 📌 solo p' sacar el username
   recipesToDisplay: RecipesToDisplay[] = []; // p' le filtro de "mias" o "todas"

   constructor(
      private recipesService: RecipesService,
      public dialogService: DialogService,
      private accountService: AccountService
   ) {
      this.recipeParams = this.recipesService.getRecipeParams();

      // 📌 solo p' sacar el username y pasarlo al filtro de mias
      this.accountService.currentUser$.pipe(take(1)).subscribe({
         next: (user) => {
            if (user) {
               this.user = user;
            }
         },
      });
   }

   ngOnInit(): void {
      this.loadRecipes();

      if (this.user) {
         this.recipesToDisplay = [
            { name: '', label: 'Todas' },
            { name: this.user.userName, label: 'Mias' },
         ];
      }
   }

   loadRecipes() {
      if (this.recipeParams) {
         // 1ro los pongo xsi los he cambiado
         this.recipesService.setRecipeParams(this.recipeParams);

         this.recipesService.getRecipes(this.recipeParams).subscribe({
            next: (res) => {
               if (res.result && res.pagination) {
                  this.recipes = res.result;
                  this.pagination = res.pagination;
               }
            },
         });
      }
   }

   displayRecipe(recipe: Recipe) {
      this.refDisplayRecipe = this.dialogService.open(RecipeDisplayComponent, {
         data: recipe,
         styleClass: 'displayRecipeClass',
         dismissableMask: true,
      });

      // al cerrar el modal de displayReceta por borrado o editar
      this.refDisplayRecipe.onClose.subscribe({
         next: (modalRecipeDisplayCerrado: CloseModal) => {
            // por si se cierra con esc o picando fuera del modal
            if (!modalRecipeDisplayCerrado) return;

            if (modalRecipeDisplayCerrado.por === 'Receta-borrada') {
               // mientras casheo
               this.loadRecipes();
            }
         },
      });
   }

   // private arrayEqual(arr1: any[], arr2: any[]) {
   //    // transformo todo el array en un string
   //    return JSON.stringify(arr1.sort()) === JSON.stringify(arr2.sort());
   // }

   pageChanged(e: number) {
      if (!this.recipeParams) return;

      this.recipeParams.pageNumber = e;

      // ya lo hago en loadRecipes()
      // this.recipesService.setRecipeParams(this.recipeParams);

      this.loadRecipes();
   }

   fetchMyRecipes() {
      if (!this.recipeParams) return;

      this.recipeParams.membername = '';
      this.recipeParams.title = '';

      this.loadRecipes();
   }

   ngOnDestroy(): void {
      // cerrar modales
      if (this.refDisplayRecipe) this.refDisplayRecipe?.close();
   }

   borderColor(category: string) {
      switch (category) {
         case 'Bebés':
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

/* 
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecipesService } from '../_services/recipes.service';
import { EditedRecipe, NewRecipe, Recipe } from '../_models/recipe';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { NotificationsService } from '../notifications/notifications.service';
import { RecipeDisplayComponent } from './recipe-display/recipe-display.component';

// interface CloseModal {
//    por: string;
//    id: number; // receta o post
// }

@Component({
   selector: 'app-recipes',
   templateUrl: './recipes.component.html',
   styleUrls: ['./recipes.component.css'],
   providers: [DialogService],
})
export class RecipesComponent implements OnInit, OnDestroy {
   recipes?: Recipe[] = [];

   refDisplayRecipe?: DynamicDialogRef;
   // refAddRecipe?: DynamicDialogRef;
   // refEditRecipe?: DynamicDialogRef;

   constructor(
      private recipesService: RecipesService,
      public dialogService: DialogService,
      private notification: NotificationsService
   ) {}

   ngOnInit(): void {
      this.loadRecipes();
   }

   loadRecipes() {
      this.recipesService.getRecipes().subscribe({
         next: (recipes) => {
            this.recipes = recipes;
         },
      });
   }

   displayRecipe(recipe: Recipe) {
      this.refDisplayRecipe = this.dialogService.open(RecipeDisplayComponent, {
         data: recipe,
         styleClass: 'displayRecipeClass',
         dismissableMask: true,
      });

      // al cerrar el modal de displayReceta por borrado o editar
      // this.refDisplayRecipe.onClose.subscribe({
      //    next: (modalRecipeDisplayCerrado: CloseModal) => {
      //       // por si se cierra con esc o picando fuera del modal
      //       if (!modalRecipeDisplayCerrado) return;

      //       if (modalRecipeDisplayCerrado.por === 'Receta-borrada') {
      //          // mientras casheo
      //          this.loadRecipes();
      //          //
      //       } else if (modalRecipeDisplayCerrado.por === 'Editar-receta') {
      //          this.showEditRecipe(modalRecipeDisplayCerrado.id);
      //       }
      //    },
      // });
   }

   // showEditRecipe(recipeId: number) {
   //    if (!this.recipes) return;

   //    const recipeToEdit = this.recipes.find(
   //       (recipe) => recipe.id === recipeId
   //    );

   //    // lo necesito para que termine la animación de salida (del modal de displayReceta) y entre bien el segundo (de AddRecipeComponent) y no salga la barra de scroll 🤦‍♂️💩
   //    setTimeout(() => {
   //       this.refEditRecipe = this.dialogService.open(AddRecipeComponent, {
   //          data: recipeToEdit,
   //          header: 'Editar Receta',
   //          styleClass: 'addRecipeClass',
   //          dismissableMask: true,
   //       });

   //       // este NO lo quería acá dentro pero ni modo 🤦‍♂️💩
   //       this.refEditRecipe?.onClose.subscribe({
   //          next: (editRecipe: EditedRecipe) => {
   //             if (editRecipe) {
   //                this.recipesService.editRecipe(editRecipe).subscribe({
   //                   next: (_) => {
   //                      this.callNotificationAndLoadRecipes('Receta editada.');
   //                   },
   //                });
   //             }
   //          },
   //       });
   //    }, 200);
   // }

   //
   //
   //

   // showAddRecipe() {
   //    this.refAddRecipe = this.dialogService.open(AddRecipeComponent, {
   //       header: 'Añadir Receta',
   //       styleClass: 'addRecipeClass',
   //       dismissableMask: true,
   //    });

   //    // 🌟 p' añadir la mando de vuelta p' acá, el editar lo voy a manejar desde allá llamando recipesService
   //    this.refAddRecipe.onClose.subscribe({
   //       next: (newRecipe: NewRecipe) => {
   //          if (newRecipe) {
   //             this.recipesService.addRecipe(newRecipe).subscribe({
   //                next: (recetaNueva) => {
   //                   //no estoy ocupando la respuesta hasta que cashee en front
   //                   this.callNotificationAndLoadRecipes('Receta añadida.');
   //                },
   //             });

   //             // ocupo .updateUserRoles solo si los arrays de users son distintos
   //             // if (!this.arrayEqual(selectedRoles, user.roles)) {
   //             //    this.adminService
   //             //       .updateUserRoles(user.username, selectedRoles)
   //             //       .subscribe({
   //             //          next: (roles) => (user.roles = roles),
   //             //       });
   //             // }
   //          }
   //       },
   //    });
   // }

   // callNotificationAndLoadRecipes(detail: string) {
   //    this.notification.addNoti({
   //       severity: 'success',
   //       summary: 'Listo.',
   //       detail: detail,
   //    });

   //    // mientras casheo ajajajj
   //    this.loadRecipes();
   // }

   private arrayEqual(arr1: any[], arr2: any[]) {
      // transformo todo el array en un string
      return JSON.stringify(arr1.sort()) === JSON.stringify(arr2.sort());
   }

   ngOnDestroy(): void {
      // cerrar modales
      if (this.refDisplayRecipe) this.refDisplayRecipe?.close();

      // if (this.refAddRecipe) this.refAddRecipe?.close();
   }

   borderColor(category: string) {
      switch (category) {
         case 'Bebés':
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

*/
