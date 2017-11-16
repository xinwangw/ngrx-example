import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SharedInternalEventService {

  private pendingCount = 0;

  private pendingCountUISubject: Subject<number> = new Subject<number>();

  onPendingCountUIEvent: Observable<number> = this.pendingCountUISubject.asObservable();

  pushPendingCountUI(count: number) {
    this.pendingCount += count;
    this.pendingCountUISubject.next(this.pendingCount);
  }
}
