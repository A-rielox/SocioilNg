import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';
import { UserParams } from 'src/app/_models/userParams';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

interface Sorting {
   name: string;
   label: string;
}

@Component({
   selector: 'app-member-list',
   templateUrl: './member-list.component.html',
   styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
   // members$: Observable<Member[]> | undefined;
   members: Member[] = [];
   pagination: Pagination | undefined;
   userParams: UserParams | undefined; // aqui estan los filtros
   user: User | undefined; // NO lo estoy ocupando, era p' sacar el gender y ponerlo en params

   totalRecords: number = 1; // p' paginator
   visibleMember: number | null = null; // p' la card

   //sorting options
   sortingOpts: Sorting[] = [
      { name: 'lastActive', label: 'Más reciente' },
      { name: 'a-z', label: 'Nombre a-z' },
   ];
   sortingChoice = 'lastActive';

   constructor(
      private memberService: MembersService,
      private accountService: AccountService
   ) {
      this.accountService.currentUser$.pipe(take(1)).subscribe({
         next: (user) => {
            if (user) {
               this.userParams = new UserParams();
               this.user = user;
            }
         },
      });
   }

   ngOnInit(): void {
      // this.members$ = this.memberService.getMembers();
      this.loadMembers();
   }

   loadMembers() {
      if (!this.userParams) return; // ya estan, los creo en el ctor.

      this.memberService.getMembers(this.userParams).subscribe({
         next: (res) => {
            // console.log(res); {pagination: {…}}

            if (res.result && res.pagination) {
               this.members = res.result;
               this.pagination = res.pagination;

               this.totalRecords = res.pagination.totalItems; // p' paginator
            }
         },
      });
   }

   pageChanged(event: any) {
      //event.first = Index of the first record
      //event.rows = Number of rows to display in new page
      //event.page = Index of the new page
      //event.pageCount = Total number of pages

      // this.pageNumber = event.page + 1;
      if (!this.userParams) return;

      this.userParams.pageNumber = event.page + 1;
      this.loadMembers();
   }

   // sortSelected() {
   //    console.log(this.userParams);
   //    // this.loadMembers()
   // }
}
