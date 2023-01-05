import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

interface Generos {
   name: string;
}

@Component({
   selector: 'app-member-edit',
   templateUrl: './member-edit.component.html',
   styleUrls: ['./member-edit.component.css'],
})
export class MemberEditComponent implements OnInit {
   member: Member | undefined;
   user: User | null = null;

   generos: Generos[] = [{ name: 'Femenino' }, { name: 'Masculino' }];
   quantity1: number = 18; // para edad
   images: any[] = [];
   responsiveOptions: any[] = [
      {
         breakpoint: '1024px',
         numVisible: 5,
      },
      {
         breakpoint: '768px',
         numVisible: 3,
      },
      {
         breakpoint: '560px',
         numVisible: 1,
      },
   ];

   constructor(
      private accountService: AccountService,
      private memberService: MembersService
   ) {
      this.accountService.currentUser$.pipe(take(1)).subscribe({
         next: (user) => {
            this.user = user;
         },
      });
   }

   ngOnInit(): void {
      this.loadMember();
   }

   loadMember() {
      if (!this.user) return;

      this.memberService.getMember(this.user.userName).subscribe({
         next: (member) => (this.member = member),
      });
   }
}
