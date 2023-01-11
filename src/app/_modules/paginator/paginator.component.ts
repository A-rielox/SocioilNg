import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
   selector: 'app-paginator',
   templateUrl: './paginator.component.html',
   styleUrls: ['./paginator.component.css'],
})
export class PaginatorComponent implements OnInit {
   @Input() numberOfPages: number = 1;
   @Input() currentPage: number = 1;
   @Output() changePage: EventEmitter<number> = new EventEmitter();

   pageOptions: number[] = [];

   constructor() {}

   ngOnInit(): void {
      this.pageOptions = this.setPageOptions();
   }

   ngOnChanges() {
      this.pageOptions = this.setPageOptions();
   }

   setPageOptions() {
      return [
         this.currentPage - 2,
         this.currentPage - 1,
         this.currentPage,
         this.currentPage + 1,
         this.currentPage + 2,
      ].filter(
         (pageNumber) => pageNumber >= 1 && pageNumber <= this.numberOfPages
      );
   }

   pageChange(i: number) {
      this.changePage.emit(i);
   }
}

/* 
export class PaginatorComponent implements OnInit {
   @Input() numberOfPages: number = 1;
   currentPage: number = 1;

   pageOptions: number[] = [];

   constructor() {}

   ngOnInit(): void {
      this.pageOptions = [
         this.currentPage - 2,
         this.currentPage - 1,
         this.currentPage,
         this.currentPage + 1,
         this.currentPage + 2,
      ].filter(
         (pageNumber) => pageNumber >= 1 && pageNumber <= this.numberOfPages
      );
   }

   pageChange(i: number) {
      console.log(i);
   }
}
*/
