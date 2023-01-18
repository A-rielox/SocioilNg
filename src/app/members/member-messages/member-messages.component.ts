import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Message } from 'src/app/_models/message';
import { MessageService } from 'src/app/_services/message.service';

import { TimeagoIntl } from 'ngx-timeago';
import { strings as englishStrings } from 'ngx-timeago/language-strings/es';
import { NgForm } from '@angular/forms';

@Component({
   selector: 'app-member-messages',
   templateUrl: './member-messages.component.html',
   styleUrls: ['./member-messages.component.css'],
})
export class MemberMessagesComponent implements OnInit {
   @ViewChild('messageForm') messageForm?: NgForm; // p' el reset()
   @Input() username?: string;
   @Input() messages: Message[] = [];

   messageContent = '';

   constructor(
      private messageService: MessageService,
      private intl: TimeagoIntl
   ) {
      // p' timeAgo en español
      this.intl.strings = englishStrings;
      this.intl.changes.next();
   }

   ngOnInit(): void {}

   sendMessage() {
      if (!this.username) return;

      this.messageService
         .sendMessage(this.username, this.messageContent)
         .subscribe({
            next: (message) => {
               this.messages.push(message);
               this.messageForm?.reset();
            },
         });
   }
}
