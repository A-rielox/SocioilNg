export class PostParams {
   pageNumber = 1;
   pageSize = 10;

   ownername: string = '';
   membername: string = '';
   title: string = '';

   constructor() {}
}

/* 
   public string Ownername { get; set; } // p'q busque "mis" recetas
   public string Membername { get; set; } // p' buscar recetas de member
   public string Title { get; set; } // q el titulo contenga
*/
