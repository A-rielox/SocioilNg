import { Component, OnInit } from '@angular/core';
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
   // members$: Observable<Member[]> | undefined;
   members: Member[] = [];
   pagination: Pagination | undefined; // p'paginator en .html
   userParams: UserParams | undefined; // aqui estan los filtros

   //sorting options
   sortingOpts: Sorting[] = [
      { name: 'lastActive', label: 'Más reciente' },
      { name: 'a-z', label: 'Nombre a-z' },
   ];
   sortingChoice = 'lastActive'; // yellow revisar si lo ocupo

   constructor(private memberService: MembersService) {
      this.userParams = this.memberService.getUserParams();
   }

   ngOnInit(): void {
      // this.members$ = this.memberService.getMembers();
      this.loadMembers();
   }

   loadMembers() {
      if (this.userParams) {
         // 1ro los pongo xsi los he cambiado
         this.memberService.setUserParams(this.userParams);

         this.memberService.getMembers(this.userParams).subscribe({
            next: (res) => {
               if (res.result && res.pagination) {
                  this.members = res.result;
                  this.pagination = res.pagination;
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
