import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EditedPost, NewPost, Post } from 'src/app/_models/post';
import { OilsAndCat } from 'src/app/_models/recipe';
import { PostsService } from 'src/app/_services/posts.service';
import { NotificationsService } from 'src/app/notifications/notifications.service';
import { categoryList } from 'src/app/recipes/optionLists';

@Component({
   selector: 'app-add-post',
   templateUrl: './add-post.component.html',
   styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent implements OnInit {
   componentMode: string = 'New';
   PostsForm: FormGroup = new FormGroup({});
   postToEdit?: Post;

   allCats?: OilsAndCat[];

   // el textArea
   text: string = '';

   constructor(
      private fb: FormBuilder,
      private postsService: PostsService,
      private notification: NotificationsService,
      private router: Router
   ) {
      const navigation = this.router.getCurrentNavigation();
      this.postToEdit = navigation?.extras.state?.['post'];
   }

   ngOnInit(): void {
      this.initializeForm();
      this.allCats = categoryList;

      //          edicion
      if (this.postToEdit) {
         this.componentMode = 'Edit';

         const { id, title, category, content } = this.postToEdit;

         this.PostsForm.setValue({
            id,
            title,
            category: [{ name: category }],
            content, //-----> yellow
         });
      }
   }

   initializeForm() {
      this.PostsForm = this.fb.group({
         id: [-1, Validators.required],
         title: [
            '',
            [
               Validators.required,
               Validators.minLength(5),
               Validators.maxLength(30),
            ],
         ],
         content: [
            '',
            [
               Validators.required,
               Validators.minLength(30),
               Validators.maxLength(1000),
            ],
         ],
         category: [[], Validators.required],
      });
   }

   sendPost() {
      const { category, title, content, id } = this.PostsForm.value;

      if (!category || !title || !content) return;

      let cat = category[0]?.name;

      if (this.componentMode === 'New') {
         const newPost: NewPost = {
            title: title,
            category: cat,
            content: content,
         };

         console.log(newPost); //---------> yellow

         this.postsService.addPost(newPost).subscribe({
            next: (postNuevo) => {
               //no estoy ocupando la respuesta hasta que cashee en front
               this.callNotificationAndLoadRecipes('Post añadido.');
               this.PostsForm.reset();
            },
         });
      } else if (this.componentMode === 'Edit') {
         const editedPost: EditedPost = {
            id: id,
            title: title,
            category: cat,
            content: content,
         };

         console.log(editedPost.content); //---------> yellow

         this.postsService.editPost(editedPost).subscribe({
            next: (_) => {
               this.callNotificationAndLoadRecipes('Post editado.');
               this.PostsForm.reset();
               this.router.navigateByUrl('/posts');
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
}
