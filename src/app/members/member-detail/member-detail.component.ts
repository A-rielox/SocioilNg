import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';

import { strings as englishStrings } from 'ngx-timeago/language-strings/es';
import { TimeagoIntl } from 'ngx-timeago';
import { MessageService } from 'src/app/_services/message.service';
import { Message } from 'src/app/_models/message';

@Component({
   selector: 'app-member-detail',
   templateUrl: './member-detail.component.html',
   styleUrls: ['./member-detail.component.css'],
})
export class MemberDetailComponent implements OnInit {
   // @ViewChild('memberTabs') memberTabs?: TabView;

   member: Member | undefined;
   messages: Message[] = [];

   images2: any[] = [];
   selectedImageIndex2: number = 0;

   images: any[] = [];
   responsiveOptions: any[] = [
      {
         breakpoint: '1024px',
         numVisible: 4,
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

   activeTabIndex: number = 0;

   constructor(
      private memberService: MembersService,
      private messageService: MessageService,
      private route: ActivatedRoute,
      private intl: TimeagoIntl
   ) {
      // p' timeAgo en español
      this.intl.strings = englishStrings;
      this.intl.changes.next();
   }

   ngOnInit(): void {
      this.loadMember();

      // p' cuando le pican al sobre en la card o a un mensaje
      this.route.queryParams.subscribe({
         next: (params) => {
            if (params['tab'] === 'Mensajes') {
               this.selectTab();
            }
         },
      });
   }

   loadMember() {
      const username = this.route.snapshot.paramMap.get('username');
      if (!username) return;

      this.memberService.getMember(username).subscribe({
         next: (member) => {
            this.member = member;

            this.images = this.getImages();
         },
      });
   }

   getImages() {
      if (!this.member) return [];

      const imgsUrls = [];

      for (const photo of this.member.photos) {
         imgsUrls.push({
            previewImageSrc: photo.url,
            thumbnailImageSrc: photo.url,
            alt: photo.id,
            title: photo.id,
         });
      }

      return imgsUrls;
   }

   selectTab() {
      this.loadMessages();
      // en indice 2 tengo Mensajes
      this.activeTabIndex = 2;
   }

   loadMessages() {
      if (this.member) {
         this.messageService.getMessageThread(this.member.userName).subscribe({
            next: (messages) => (this.messages = messages),
         });
      }
   }

   onTabChanged(e: any) {
      // console.log(e.originalEvent.srcElement.firstElementChild.innerText);
      const activeTab = e.originalEvent.srcElement.firstElementChild.innerText;

      if (activeTab === 'Mensajes') {
         this.loadMessages();
      }
   }
}

// { path: 'miembros/:username', component: MemberDetailComponent },
