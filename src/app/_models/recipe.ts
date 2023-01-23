export interface Recipe {
   id: number;
   content: string;
   oilsList: string;
   createdById: number;
   createdByUsername: string;
   createdByPhotoUrl: string;
}

// [
//    {
//        "id": 3,
//        "content": "Test primera receta 1111",
//        "oilsList": "burnes,ocote,cilantro",
//        "createdById": 1,
//        "createdByUsername": "lisa",
//        "createdByPhotoUrl": "https://randomuser.me/api/portraits/women/54.jpg"
//    },
//    ...
// ]
