import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Recipe } from 'src/app/_models/recipe';
import { ConfirmationService } from 'primeng/api';
import { RecipesService } from 'src/app/_services/recipes.service';
import { NotificationsService } from 'src/app/notifications/notifications.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
   selector: 'app-recipe-display',
   templateUrl: './recipe-display.component.html',
   styleUrls: ['./recipe-display.component.css'],
   providers: [ConfirmationService],
})
export class RecipeDisplayComponent implements OnInit {
   recipe?: Recipe;

   constructor(
      public recipesService: RecipesService,
      public ref: DynamicDialogRef,
      public config: DynamicDialogConfig,
      private confirmationService: ConfirmationService,
      private notification: NotificationsService,
      ////
      private router: Router
   ) {}

   ngOnInit(): void {
      this.recipe = this.config.data;
   }

   onEdit() {
      // this.ref.close(); p' cerra este modal
      this.ref.close();
      const navigationExtras: NavigationExtras = {
         state: { recipe: this.recipe },
      };

      this.router.navigateByUrl('/add-edit/recipe', navigationExtras);
   }

   // pop-up de confirmar borrado
   confirm(event: Event) {
      if (!event.target) return;

      this.confirmationService.confirm({
         target: event.target,
         message: 'Confirmas que quieres borrar ?',
         acceptLabel: 'Si',
         rejectLabel: 'No',
         icon: 'pi pi-exclamation-triangle',
         accept: () => {
            if (!this.recipe) return;

            // borro desde acá solo xq el otro componente está muy grande 👍
            this.recipesService.deleteRecipe(this.recipe.id).subscribe({
               next: (_) => {
                  this.notification.addNoti({
                     severity: 'success',
                     summary: 'Listo.',
                     detail: 'Receta borrada con éxito.',
                  });

                  // red red mientras casheo
                  // desde aqui solo p' mandar la señal y q recarge las recetas a tiempo
                  this.ref.close({
                     por: 'Receta-borrada',
                     id: -1,
                  });
               },
            });

            // this.ref.close('OK');
         },
         reject: () => {},
      });
   }

   // borderColor(category: string) {
   //    switch (category) {
   //       case 'Bebes':
   //          return 'background: linear-gradient(15deg, #06d465, #06b6d4); border-left: 10px solid transparent;';

   //       case 'Salud':
   //          return 'background: linear-gradient(15deg, #f91616, #f97316); border-left: 10px solid transparent;';

   //       case 'Belleza':
   //          return 'background: linear-gradient(15deg, #cc63f1, #6366f1); border-left: 10px solid transparent;';

   //       default:
   //          return 'background: linear-gradient(15deg, #eae91c, #6d1e70); border-left: 10px solid transparent;';
   //    }
   // }
}
