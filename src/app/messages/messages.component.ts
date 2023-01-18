import { Component, OnInit } from '@angular/core';
import { Message } from '../_models/message';
import { Pagination } from '../_models/pagination';
import { MessageService } from '../_services/message.service';

import { TimeagoIntl } from 'ngx-timeago';
import { strings as englishStrings } from 'ngx-timeago/language-strings/es';

interface Containers {
   name: string;
   label: string;
   icon: string;
}

@Component({
   selector: 'app-messages',
   templateUrl: './messages.component.html',
   styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
   messages?: Message[];
   pagination?: Pagination;
   container = 'Outbox';
   pageNumber = 1;
   pageSize = 5;
   loading = false;

   containers: Containers[] = [
      { name: 'Unread', label: 'Nuevos', icon: 'pi pi-envelope mr-2' },
      { name: 'Inbox', label: 'Recibidos', icon: 'pi pi-folder-open mr-2' },
      { name: 'Outbox', label: 'Enviados', icon: 'pi pi-send mr-2' },
   ];

   constructor(
      private messageService: MessageService,
      private intl: TimeagoIntl
   ) {
      // p' timeAgo en español
      this.intl.strings = englishStrings;
      this.intl.changes.next();
   }

   ngOnInit(): void {
      this.loadMessages();
   }

   loadMessages() {
      this.loading = true;

      this.messageService
         .getMessages(this.pageNumber, this.pageSize, this.container)
         .subscribe({
            next: (res) => {
               this.messages = res.result;

               if (res.pagination!.totalPages > 1) {
                  this.pagination = res.pagination;
               } else {
                  this.pagination = undefined;
               }

               this.loading = false;
            },
         });
   }

   pageChanged(e: number) {
      this.pageNumber = e;
      this.loadMessages();
   }

   deleteMessage(id: number) {
      console.log('borrar y borrarrrrr');
   }
}
