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
