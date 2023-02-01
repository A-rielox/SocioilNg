import { Component, OnInit } from '@angular/core';
import { Post } from '../_models/post';
import { Pagination } from '../_models/pagination';
import { User } from '../_models/user';
import { PostsService } from '../_services/posts.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AccountService } from '../_services/account.service';
import { take } from 'rxjs/operators';
import { PostDisplayComponent } from './post-display/post-display.component';
import { PostParams } from '../_models/postParams';

interface PostsToDisplay {
   name: string;
   label: string;
}

interface CloseModal {
   por: string;
   id: number; // receta o post
}

@Component({
   selector: 'app-posts',
   templateUrl: './posts.component.html',
   styleUrls: ['./posts.component.css'],
   providers: [DialogService],
})
export class PostsComponent implements OnInit {
   posts?: Post[] = [];
   pagination: Pagination | undefined; // p'paginator en .html
   postParams: PostParams | undefined; // aqui estan los filtros

   refDisplayPost?: DynamicDialogRef;

   ///////
   user: User | undefined; // 📌 solo p' sacar el username
   postsToDisplay: PostsToDisplay[] = [];

   constructor(
      private postsService: PostsService,
      public dialogService: DialogService,
      private accountService: AccountService
   ) {
      this.postParams = postsService.getPostParams();

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
      this.loadPosts();

      if (this.user) {
         this.postsToDisplay = [
            { name: '', label: 'Todas' },
            { name: this.user.userName, label: 'Mias' },
         ];
      }
   }

   filterPosts() {
      if (!this.postParams) return;

      this.postParams.pageNumber = 1;

      this.loadPosts();
   }

   loadPosts() {
      if (!this.postParams) return;

      this.postsService.getPosts(this.postParams).subscribe({
         next: (res) => {
            if (res.result && res.pagination) {
               this.posts = res.result;
               this.pagination = res.pagination;
            }
         },
      });
   }

   displayPost(post: Post) {
      this.refDisplayPost = this.dialogService.open(PostDisplayComponent, {
         data: post,
         styleClass: 'displayPostClass',
         dismissableMask: true,
      });

      // al cerrar el modal de displayReceta por borrado o editar
      this.refDisplayPost.onClose.subscribe({
         next: (modalPostDisplayCerrado: CloseModal) => {
            // por si se cierra con esc o picando fuera del modal
            if (!modalPostDisplayCerrado) return;

            if (modalPostDisplayCerrado.por === 'Post-borrado') {
               // mientras casheo
               this.loadPosts();
            }
         },
      });
   }

   // private arrayEqual(arr1: any[], arr2: any[]) {
   //    // transformo todo el array en un string
   //    return JSON.stringify(arr1.sort()) === JSON.stringify(arr2.sort());
   // }

   pageChanged(e: number) {
      if (!this.postParams) return;

      this.postParams.pageNumber = e;

      // ya lo hago en loadRecipes()
      // this.recipesService.setPostParams(this.postParams);

      this.loadPosts();
   }

   fetchMyPosts() {
      if (!this.postParams) return;

      this.postParams.membername = '';
      this.postParams.title = '';

      this.loadPosts();
   }

   ngOnDestroy(): void {
      // cerrar modales
      if (this.refDisplayPost) this.refDisplayPost?.close();
   }

   border2Color(category: string) {
      switch (category) {
         case 'Piel':
            return 'border-color: #06d465';
         // return 'background: linear-gradient(15deg, #06d465, #06b6d4); border-top-width: 3px;';

         case 'Salud':
            return 'border-color: #f97316';
         // return 'background: linear-gradient(15deg, #f91616, #f97316); border-top-width: 3px;';

         case 'Belleza':
            return 'border-color: #6366f1';
         // return 'background: linear-gradient(15deg, #cc63f1, #6366f1); border-top-width: 3px;';

         default:
            return 'border-color: #eae91c';
         // return 'background: linear-gradient(15deg, #eae91c, #6d1e70); border-top-width: 3px;';
      }
   }
}
