import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EditedPost, NewPost, Post } from '../_models/post';

@Injectable({
   providedIn: 'root',
})
export class PostsService {
   baseUrl = environment.apiUrl;

   constructor(private http: HttpClient) {}

   getPosts() {
      return this.http.get<Post[]>(this.baseUrl + 'posts');
   }

   addPost(newPost: NewPost) {
      return this.http.post<Post>(this.baseUrl + 'posts', newPost);
      // devuelve el postDto, cuando cashee en front lo voy a ocupar
   }

   deletePost(id: number) {
      return this.http.delete(this.baseUrl + 'posts/' + id);
   }

   editPost(editPost: EditedPost) {
      return this.http.put(this.baseUrl + 'posts', editPost);
   }
}
