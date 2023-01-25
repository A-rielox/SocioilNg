export interface Recipe {
   id: number;
   category: string;
   title: string;
   content: string;
   oilsList: string;
   created: Date;
   createdById: number;
   createdByUsername: string;
   createdByPhotoUrl: string;
}

export interface OilsAndCat {
   name: string;
   // code: string;
}

export interface RecipeForm {
   id: number;
   title: string;
   content: string;
   oilsList: OilsAndCat[];
   category: OilsAndCat[];
}

export interface NewRecipe {
   title: string;
   category: string;
   content: string;
   oilsList: string;
}

export interface EditedRecipe {
   id: number;
   title: string;
   category: string;
   content: string;
   oilsList: string;
}
