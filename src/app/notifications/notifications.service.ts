import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface Command {
   severity: string;
   summary: string;
   detail: string;
}

@Injectable({
   providedIn: 'root',
})
export class NotificationsService {
   messagesInput: Subject<Command>;
   messagesOutput: Observable<Command>;

   constructor() {
      this.messagesInput = new Subject<Command>();
      this.messagesOutput = this.messagesInput.asObservable();
   }

   addNoti(message: Command) {
      this.messagesInput.next(message);
   }
}
