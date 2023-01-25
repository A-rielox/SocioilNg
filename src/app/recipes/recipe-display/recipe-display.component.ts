import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Recipe } from 'src/app/_models/recipe';
import { AddRecipeComponent } from '../add-recipe/add-recipe.component';
import { ConfirmationService } from 'primeng/api';
import { RecipesService } from 'src/app/_services/recipes.service';
import { NotificationsService } from 'src/app/notifications/notifications.service';

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
      public dialogService: DialogService,
      public ref: DynamicDialogRef,
      public config: DynamicDialogConfig,
      private confirmationService: ConfirmationService,
      private notification: NotificationsService
   ) {}

   ngOnInit(): void {
      this.recipe = this.config.data;
   }

   show() {
      // p' cerra el RecipeDisplayComponent antes de abrir el de editar
      this.ref.close();

      // lo necesito acá dentro para que termine la animación de salida y entre bien el segundo y no salga la barra de scroll 🤦‍♂️💩
      setTimeout(() => {
         const ref = this.dialogService.open(AddRecipeComponent, {
            data: this.recipe,
            header: 'Añadir Receta',
            styleClass: 'addRecipeClass',
            dismissableMask: true,
         });
      }, 200);
   }

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

            this.recipesService.deleteRecipe(this.recipe.id).subscribe({
               next: (_) => {
                  this.notification.addNoti({
                     severity: 'success',
                     summary: 'Listo.',
                     detail: 'Mensaje borrado con éxito.',
                  });

                  // red red mientras casheo
                  // desde aqui solo p' mandar la señal y q recarge las recetas a tiempo
                  this.ref.close('OK');
               },
            });

            // this.ref.close('OK');
         },
         reject: () => {
            // console.log('siempre no');
         },
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
