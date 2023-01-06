import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
   selector: 'app-member-detail',
   templateUrl: './member-detail.component.html',
   styleUrls: ['./member-detail.component.css'],
})
export class MemberDetailComponent implements OnInit {
   member: Member | undefined;

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

   constructor(
      private memberService: MembersService,
      private route: ActivatedRoute
   ) {}

   ngOnInit(): void {
      this.loadMember();
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
}

// { path: 'miembros/:username', component: MemberDetailComponent },
