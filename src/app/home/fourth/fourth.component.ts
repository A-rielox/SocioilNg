import { Component, OnInit } from '@angular/core';

@Component({
   selector: 'app-fourth',
   templateUrl: './fourth.component.html',
   styleUrls: ['./fourth.component.css'],
})
export class FourthComponent implements OnInit {
   visible1 = false;
   visible2 = false;
   visible3 = false;

   constructor() {}

   ngOnInit(): void {}
}
