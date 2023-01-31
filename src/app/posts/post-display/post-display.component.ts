import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Post } from 'src/app/_models/post';
import { PostsService } from 'src/app/_services/posts.service';
import { NotificationsService } from 'src/app/notifications/notifications.service';

@Component({
   selector: 'app-post-display',
   templateUrl: './post-display.component.html',
   styleUrls: ['./post-display.component.css'],
   providers: [ConfirmationService],
})
export class PostDisplayComponent implements OnInit {
   post?: Post;

   constructor(
      public postsService: PostsService,
      public ref: DynamicDialogRef,
      public config: DynamicDialogConfig,
      private confirmationService: ConfirmationService,
      private notification: NotificationsService,
      ////
      private router: Router
   ) {}

   ngOnInit(): void {
      this.post = this.config.data;
   }

   onEdit() {
      console.log('edit edit edit');
      // p' cerra este modal this.ref.close();
      this.ref.close();
      const navigationExtras: NavigationExtras = {
         state: { post: this.post },
      };

      this.router.navigateByUrl('/add-edit/post', navigationExtras);
   }

   // pop-up de confirmar borrado
   confirm(event: Event) {
      console.log('confirm confirm confirm');
      if (!event.target) return;

      this.confirmationService.confirm({
         target: event.target,
         message: 'Confirmas que quieres borrar ?',
         acceptLabel: 'Si',
         rejectLabel: 'No',
         icon: 'pi pi-exclamation-triangle',
         accept: () => {
            if (!this.post) return;

            // borro desde acá solo xq el otro componente está muy grande 👍
            this.postsService.deletePost(this.post.id).subscribe({
               next: (_) => {
                  this.notification.addNoti({
                     severity: 'success',
                     summary: 'Listo.',
                     detail: 'Post borrado con éxito.',
                  });

                  // red red mientras casheo
                  // desde aqui solo p' mandar la señal y q recarge las recetas a tiempo
                  this.ref.close({
                     por: 'Post-borrado',
                     id: -1,
                  });
               },
            });

            // this.ref.close('OK');
         },
         reject: () => {},
      });
   }
}
