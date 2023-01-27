// import { User } from './user';

export class RecipeParams {
   pageNumber = 1;
   pageSize = 10;

   ownername: string = '';
   membername: string = '';
   title: string = '';

   // constructor(user: User) {
   //    this.gender = user.gender === 'female' ? 'male' : 'female';
   // }

   constructor() {}
}

/* 
   public string Ownername { get; set; } // p'q busque "mis" recetas
   public string Membername { get; set; } // p' buscar recetas de member
   public string Title { get; set; } // q el titulo contenga
*/
