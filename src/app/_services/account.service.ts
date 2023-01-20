import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { BehaviorSubject, map } from 'rxjs';

interface RegisterModel {
   username: string;
   password: string;
}

@Injectable({
   providedIn: 'root',
})
export class AccountService {
   baseUrl = environment.apiUrl;
   private currentUserSource = new BehaviorSubject<User | null>(null);
   currentUser$ = this.currentUserSource.asObservable(); // p' ocupar el currentUserSource desde afuera del AccountService

   constructor(private http: HttpClient) {}

   login(model: any) {
      return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
         map((user) => {
            if (user) {
               this.setCurrentUser(user);
            }
         })
      );
   }

   register(model: RegisterModel) {
      // estoy pasando el confirmPass
      return this.http
         .post<User>(this.baseUrl + 'account/register', model)
         .pipe(
            map((user) => {
               if (user) {
                  this.setCurrentUser(user);
               }
            })
         );
   }

   setCurrentUser(user: User) {
      user.roles = [];
      const roles = this.getDecodedToken(user.token).role;
      Array.isArray(roles) ? (user.roles = roles) : user.roles.push(roles);

      localStorage.setItem('user', JSON.stringify(user));
      this.currentUserSource.next(user);
   }

   logout() {
      localStorage.removeItem('user');
      this.currentUserSource.next(null);
   }

   getDecodedToken(token: string) {
      return JSON.parse(atob(token.split('.')[1]));
   }
}
