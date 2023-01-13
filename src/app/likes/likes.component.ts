import { Component, OnInit } from '@angular/core';
import { Member } from '../_models/member';
import { MembersService } from '../_services/members.service';
import { Pagination } from '../_models/pagination';

interface Predicates {
   name: string;
   label: string;
}

@Component({
   selector: 'app-likes',
   templateUrl: './likes.component.html',
   styleUrls: ['./likes.component.css'],
})
export class LikesComponent implements OnInit {
   // api/likes?predicate=liked   --> los q me han gustado
   // api/likes?predicate=likedBy --> a los q les e gustado
   members: Member[] | undefined;
   predicate = 'liked';
   pageNumber = 1;
   pageSize = 50;
   pagination: Pagination | undefined;

   constructor(private memberService: MembersService) {}

   generos: Predicates[] = [
      { name: 'liked', label: 'Me gustan.' },
      { name: 'likedBy', label: 'Le gusto.' },
   ];

   ngOnInit(): void {
      this.loadLikes();
   }

   loadLikes() {
      this.memberService
         .getLikes(this.predicate, this.pageNumber, this.pageSize)
         .subscribe({
            next: (res) => {
               this.members = res.result;

               if (res.pagination!.totalPages > 1) {
                  this.pagination = res.pagination;
               } else {
                  this.pagination = undefined;
               }
            },
         });
   }

   // este es el de member-list ( xsi lo quiero paginar aca )
   // de momento se muestran 50
   pageChanged(e: number) {
      this.pageNumber = e;

      this.loadLikes();
   }
}
