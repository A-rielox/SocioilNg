export interface Post {
   id: number;
   category: string;
   title: string;
   content: string;
   created: Date;
   createdById: number;
   createdByUsername: string;
   createdByPhotoUrl: string;
}

export interface PostsCat {
   name: string;
   // code: string;
}

export interface PostsForm {
   id: number;
   title: string;
   content: string;
   category: PostsCat[];
}

export interface NewPost {
   title: string;
   category: string;
   content: string;
}

export interface EditedPost {
   id: number;
   title: string;
   category: string;
   content: string;
}
