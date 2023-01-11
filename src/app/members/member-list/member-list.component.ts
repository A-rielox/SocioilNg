import { Component, OnInit, ViewChild } from '@angular/core';
import { Paginator } from 'primeng/paginator';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { UserParams } from 'src/app/_models/userParams';
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
   // totalRecords: number = 1; // p' paginator

   // members$: Observable<Member[]> | undefined;
   members: Member[] = [];
   pagination: Pagination | undefined;
   userParams: UserParams | undefined; // aqui estan los filtros

   visibleMember: number | null = null; // p' la card

   //sorting options
   sortingOpts: Sorting[] = [
      { name: 'lastActive', label: 'Más reciente' },
      { name: 'a-z', label: 'Nombre a-z' },
   ];
   sortingChoice = 'lastActive';

   constructor(private memberService: MembersService) {
      this.userParams = this.memberService.getUserParams();
   }

   ngOnInit(): void {
      // this.members$ = this.memberService.getMembers();
      this.loadMembers();
   }

   loadMembers() {
      if (this.userParams) {
         this.memberService.setUserParams(this.userParams);

         this.memberService.getMembers(this.userParams).subscribe({
            next: (res) => {
               // console.log(res); {pagination: {…}}

               if (res.result && res.pagination) {
                  this.members = res.result;
                  this.pagination = res.pagination;

                  // this.totalRecords = res.pagination.totalItems; // p' paginator
               }
            },
         });
      }
   }

   resetFilters() {
      this.userParams = this.memberService.resetUserParams();
      this.loadMembers();
   }

   pageChanged(e: number) {
      if (!this.userParams) return;

      this.userParams.pageNumber = e;

      this.memberService.setUserParams(this.userParams);

      this.loadMembers();
   }
}
