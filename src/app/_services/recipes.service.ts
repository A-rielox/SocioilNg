import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EditedRecipe, NewRecipe, Recipe } from '../_models/recipe';
import { RecipeParams } from '../_models/recipeParams';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';
import { AccountService } from './account.service';
import { take } from 'rxjs/operators';
import { User } from '../_models/user';

@Injectable({
   providedIn: 'root',
})
export class RecipesService {
   baseUrl = environment.apiUrl;

   // user: User | undefined; // 📌 solo p' sacar el username
   recipeParams: RecipeParams | undefined; // aqui estan los filtros

   constructor(
      private http: HttpClient // private accountService: AccountService
   ) {
      this.recipeParams = new RecipeParams();

      // // 📌 solo p' sacar el username
      // this.accountService.currentUser$.pipe(take(1)).subscribe({
      //    next: (user) => {
      //       if (user) {
      //          this.user = user;
      //       }
      //    },
      // });
   }

   // getRecipes() {
   //    return this.http.get<Recipe[]>(this.baseUrl + 'recipes');
   // }
   getRecipes(recipeParams: RecipeParams) {
      // solo los q conciernen a paginacion
      let params = getPaginationHeaders(
         recipeParams.pageNumber,
         recipeParams.pageSize
      );

      if (recipeParams.ownername) {
         params = params.append('ownername', recipeParams.ownername);
      }
      if (recipeParams.membername) {
         params = params.append('membername', recipeParams.membername);
      }
      if (recipeParams.title) {
         params = params.append('title', recipeParams.title);
      }

      return getPaginatedResult<Recipe[]>(
         this.baseUrl + 'recipes',
         params,
         this.http
      );
   }

   addRecipe(newRecipe: NewRecipe) {
      return this.http.post<Recipe>(this.baseUrl + 'recipes', newRecipe);
      // devuelve el recipeDto, cuando cashee en front lo voy a ocupar
   }

   deleteRecipe(id: number) {
      return this.http.delete(this.baseUrl + 'recipes/' + id);
   }

   editRecipe(editRecipe: EditedRecipe) {
      return this.http.put(this.baseUrl + 'recipes', editRecipe);
   }

   ///////////////////////////////////////////
   //////////  PARAMS
   ///////////////////////////////////////////
   getRecipeParams() {
      return this.recipeParams;
   }

   setRecipeParams(params: RecipeParams) {
      this.recipeParams = params;
   }

   resetRecipeParams() {
      this.recipeParams = new RecipeParams();

      return this.recipeParams;
   }
}

/* 
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EditedRecipe, NewRecipe, Recipe } from '../_models/recipe';
import { RecipeParams } from '../_models/recipeParams';

@Injectable({
   providedIn: 'root',
})
export class RecipesService {
   baseUrl = environment.apiUrl;

   recipeParams: RecipeParams | undefined; // aqui estan los filtros

   constructor(private http: HttpClient) {
      this.recipeParams = new RecipeParams();
   }

   getRecipes() {
      return this.http.get<Recipe[]>(this.baseUrl + 'recipes');
   }

   addRecipe(newRecipe: NewRecipe) {
      return this.http.post<Recipe>(this.baseUrl + 'recipes', newRecipe);
      // devuelve el recipeDto, cuando cashee en front lo voy a ocupar
   }

   deleteRecipe(id: number) {
      return this.http.delete(this.baseUrl + 'recipes/' + id);
   }

   editRecipe(editRecipe: EditedRecipe) {
      return this.http.put(this.baseUrl + 'recipes', editRecipe);
   }

   ///////////////////////////////////////////
   //////////  PARAMS
   ///////////////////////////////////////////
   getUserParams() {
      return this.recipeParams;
   }

   setUserParams(params: RecipeParams) {
      this.recipeParams = params;
   }

   resetUserParams() {
      this.recipeParams = new RecipeParams();

      return this.recipeParams;
   }
}


*/
