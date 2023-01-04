import { Photo } from './photo';

export interface Member {
   id: number;
   userName: string;
   photoUrl: string;
   age: number;
   knownAs: string;
   gender: string;
   introduction: string;
   city: string;
   country: string;
   photos: Photo[];
}
