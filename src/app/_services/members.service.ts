import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';

@Injectable({
   providedIn: 'root',
})
export class MembersService {
   baseUrl = environment.apiUrl;

   constructor(private http: HttpClient) {}

   ///////////////////////////////////////////
   //////////  PARAMS
   ///////////////////////////////////////////
   getUserParams() {}

   setUserParams() {}

   resetUserParams() {}

   ///////////////////////////////////////////
   //////////  MEMBERS
   ///////////////////////////////////////////
   getMembers() {
      return this.http.get<Member[]>(this.baseUrl + 'users');
   }

   getMember(username: string) {
      return this.http.get<Member>(this.baseUrl + 'users/' + username);
   }

   /* MANDABA EL HEADER CON TOKEN DESDE ACA 🤦‍♂️
   
   getHttpOptions() {
      const userString = localStorage.getItem('user');

      if (!userString) return;

      const user = JSON.parse(userString);

      return {
         headers: new HttpHeaders({
            Authorization: 'Bearer ' + user.token,
         }),
      };
   }
   */

   updateMember(member: Member) {
      return this.http.put(this.baseUrl + 'users', member);
   }

   ///////////////////////////////////////////
   //////////  FOTOS
   ///////////////////////////////////////////
   setMainPhoto() {}

   deletePhoto() {}

   ///////////////////////////////////////////
   //////////  LIKES
   ///////////////////////////////////////////

   // para dar like, el username es de a quien se le da el like
   addLike() {}

   // GET: api/likes?predicate=liked o likedBy
   // p' agarrar los likes de un user
   getLikes() {}
}
