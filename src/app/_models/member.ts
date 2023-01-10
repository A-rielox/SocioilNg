import { Photo } from './photo';

export interface Member {
   id: number;
   userName: string;
   email: string;
   photoUrl: string;
   age: number;
   knownAs: string;
   lastActive: Date;
   gender: string;
   introduction: string;
   interests: string;
   city: string;
   country: string;
   photos: Photo[];
}
