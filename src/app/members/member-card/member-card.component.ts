import { Component, Input, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';
import { NotificationsService } from 'src/app/notifications/notifications.service';

@Component({
   selector: 'app-member-card',
   templateUrl: './member-card.component.html',
   styleUrls: ['./member-card.component.css'],
})
export class MemberCardComponent implements OnInit {
   @Input() member: Member | undefined;
   @Input() index: number | undefined;

   visibleMember: number | null = null;

   constructor(
      private memberService: MembersService,
      private notification: NotificationsService
   ) {}

   ngOnInit(): void {}

   addLike(username: string) {
      this.memberService.addLike(username).subscribe({
         next: () => {
            this.notification.addNoti({
               severity: 'success',
               summary: 'Excelente',
               detail: 'Le has dado like a ' + username,
            });
         },
      });
   }
}
