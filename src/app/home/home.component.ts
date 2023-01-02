import { Component, OnInit } from '@angular/core';

@Component({
   selector: 'app-home',
   templateUrl: './home.component.html',
   styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
   // users: any;

   constructor(/* private http: HttpClient */) {}

   ngOnInit(): void {}

   // getUsers() {
   //    this.http.get('https://localhost:7051/api/Users').subscribe({
   //       next: (res) => (this.users = res),
   //       error: (error) => console.log(error),
   //       complete: () => console.log('Req completed'),
   //    });
   // }
}
