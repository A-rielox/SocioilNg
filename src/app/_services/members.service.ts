import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { map, of } from 'rxjs';

@Injectable({
   providedIn: 'root',
})
export class MembersService {
   baseUrl = environment.apiUrl;
   members: Member[] = [];

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
      if (this.members.length > 0) return of(this.members);

      return this.http.get<Member[]>(this.baseUrl + 'users').pipe(
         map((members) => {
            this.members = members;

            return members;
         })
      );
   }

   getMember(username: string) {
      const member = this.members.find((m) => m.userName === username);

      if (member) return of(member);

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
      return this.http.put(this.baseUrl + 'users', member).pipe(
         map(() => {
            const index = this.members.indexOf(member);

            this.members[index] = { ...this.members[index], ...member };
         })
      );
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
