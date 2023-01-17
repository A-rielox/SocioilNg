import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/_models/message';
// import { MessageService } from 'src/app/_services/message.service';

import { TimeagoIntl } from 'ngx-timeago';
import { strings as englishStrings } from 'ngx-timeago/language-strings/es';

@Component({
   selector: 'app-member-messages',
   templateUrl: './member-messages.component.html',
   styleUrls: ['./member-messages.component.css'],
})
export class MemberMessagesComponent implements OnInit {
   @Input() username?: string;
   @Input() messages: Message[] = [];

   constructor(
      // private messageService: MessageService,
      private intl: TimeagoIntl
   ) {
      // p' timeAgo en español
      this.intl.strings = englishStrings;
      this.intl.changes.next();
   }

   ngOnInit(): void {}

   sendMessage() {}
}
