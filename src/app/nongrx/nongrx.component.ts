import {Component, OnInit} from '@angular/core';
import {MessageService} from '../service/message.service';
import {PriceRenderComponent} from '../aggrid/render/price-render.component';
import {TimerRenderComponent} from '../aggrid/render/timer-render.component';
import {StatusRenderComponent} from '../aggrid/render/status-render.component';
import * as _ from 'lodash';
import {SharedInternalEventService} from '../service/shared-internal-event.service';

@Component({
  selector: 'app-nongrx',
  templateUrl: './nongrx.component.html',
  styleUrls: ['./nongrx.component.scss']
})
export class NongrxComponent implements OnInit {
  columnDefs: any;
  getRowClass: any;
  msgs = [];
  gridApi;

  constructor(private service: MessageService, private eventService: SharedInternalEventService) {
    this.columnDefs = [
      {headerName: 'ID', field: 'id', width: 100},
      {headerName: 'Author', field: 'author', width: 100},
      {headerName: 'Product', field: 'product', width: 100},
      {
        cellRendererFramework: PriceRenderComponent,
        headerName: 'Price', field: 'price', width: 100
      },
      {
        cellRendererFramework: TimerRenderComponent,
        headerName: 'Timer', field: 'expireTime', width: 100, sort: 'desc'
      },
      {
        cellRendererFramework: StatusRenderComponent,
        headerName: 'Status', field: 'status', width: 100
      },
    ];

    this.getRowClass = function (params) {
      return params.data.highlightClass;
    };
    console.log('init data calling...');
    this.service.subject.next({
      method: 'initData',
      data: 'initData'
    });
    this.service.responseDataSubject.subscribe(msgs => {
      console.log('NongrxComponent', msgs);

      if (msgs.initData) {
        this.msgs = msgs.initData.filter(msg => msg && msg.id)
          .map(msg => {
            return this._convert(msg);
          });
      }
      if (msgs.order) {
        const list = _.cloneDeep(this.msgs);
        list.push(this._convert(msgs.order));
        this.msgs = list;
        this.eventService.pushPendingCountUI(1);
      }
    });
  }

  private _convert(msg): any {
    return {
      id: msg.id,
      author: msg.author,
      product: msg.message.product,
      price: msg.message.price,
      highlightClass: msg.highlightClass,
      updatedTime: msg.updatedTime,
      expireTime: msg.expireTime,
      status: msg.status
    };
  }

  ngOnInit() {
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }
}
