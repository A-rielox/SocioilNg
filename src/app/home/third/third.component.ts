import { Component, OnInit } from '@angular/core';

@Component({
   selector: 'app-third',
   templateUrl: './third.component.html',
   styleUrls: ['./third.component.css'],
})
export class ThirdComponent implements OnInit {
   activeTab1 = 0;

   constructor() {}

   ngOnInit(): void {}
}
