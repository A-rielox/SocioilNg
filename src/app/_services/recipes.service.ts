import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NewRecipe, Recipe } from '../_models/recipe';

@Injectable({
   providedIn: 'root',
})
export class RecipesService {
   baseUrl = environment.apiUrl;

   constructor(private http: HttpClient) {}

   getRecipes() {
      return this.http.get<Recipe[]>(this.baseUrl + 'recipes');
   }

   addRecipe(newRecipe: NewRecipe) {
      return this.http.post<Recipe>(this.baseUrl + 'recipes', newRecipe);
      // devuelve el recipeDto, cuando cashee en front lo voy a ocupar
   }
}
