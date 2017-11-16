import {Component, OnInit} from '@angular/core';
import {SharedInternalEventService} from "../service/shared-internal-event.service";

@Component({
  selector: 'app-pending-count-no-ng-rx',
  template: `Pending orders:
            <span>
            {{count}}
            </span>`
})
export class PendingCountNoNgRxComponent implements OnInit {
  count: number;

  constructor(private eventService: SharedInternalEventService) {
    eventService.onPendingCountUIEvent.subscribe(count => {
      this.count = count;
    });
  }

  ngOnInit() {
  }

}
