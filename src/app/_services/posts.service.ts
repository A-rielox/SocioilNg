import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EditedPost, NewPost, Post } from '../_models/post';
import { PostParams } from '../_models/postParams';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

@Injectable({
   providedIn: 'root',
})
export class PostsService {
   baseUrl = environment.apiUrl;
   postParams: PostParams | undefined;

   constructor(private http: HttpClient) {
      this.postParams = new PostParams();
   }

   // getPosts() {
   //    return this.http.get<Post[]>(this.baseUrl + 'posts');
   // }
   getPosts(postParams: PostParams) {
      // solo los q conciernen a paginacion
      let params = getPaginationHeaders(
         postParams.pageNumber,
         postParams.pageSize
      );

      if (postParams.ownername) {
         params = params.append('ownername', postParams.ownername);
      }
      if (postParams.membername) {
         params = params.append('membername', postParams.membername);
      }
      if (postParams.title) {
         params = params.append('title', postParams.title);
      }

      // devuelve PostDto pero =
      return getPaginatedResult<Post[]>(
         this.baseUrl + 'posts',
         params,
         this.http
      );
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

   ///////////////////////////////////////////
   //////////  PARAMS
   ///////////////////////////////////////////
   getPostParams() {
      return this.postParams;
   }

   setPostParams(params: PostParams) {
      this.postParams = params;
   }

   resetPostParams() {
      this.postParams = new PostParams();

      return this.postParams;
   }
}
