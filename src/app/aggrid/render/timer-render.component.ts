import {AgRendererComponent} from 'ag-grid-angular';
import {IAfterGuiAttachedParams, ICellRendererParams} from 'ag-grid';
import {Component} from '@angular/core';

@Component({
  selector: 'app-price-cell',
  template: `<app-countdown [updateTime]="params.data.updatedTime"
                            [expireTime]="params.data.expireTime"
                            [max]="60" [stop]="params.data.stop"
                            (secEmitter)="updateStatus($event, params.data)"
                            #countDown></app-countdown>`

})
export class TimerRenderComponent implements AgRendererComponent {
  params: any;

  refresh(params: any): boolean {
    return true;
  }

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  afterGuiAttached(params?: IAfterGuiAttachedParams): void {
  }

  updateStatus(sec, row) {
    if (sec === 0 && row.status === 'PENDING') {
      row.status = 'Expired';
    }
  }
}
