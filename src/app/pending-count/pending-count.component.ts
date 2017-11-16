import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../store/application-state';
import {getPendingOrderCount} from '../reducer/reducer';

@Component({
  selector: 'app-pending-count',
  template: `Pending orders:
            <span>
            {{pendingCount$ | async}}
            </span>`
})
export class PendingCountComponent implements OnInit {
  pendingCount$;

  constructor(private _store: Store<ApplicationState>) {
    this.pendingCount$ = _store.select(getPendingOrderCount);
  }

  ngOnInit() {
  }

}
