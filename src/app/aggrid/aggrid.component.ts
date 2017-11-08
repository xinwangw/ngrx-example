import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../store/application-state';
import {Observable} from 'rxjs/Observable';
import {getInitOrders} from '../reducer/reducer';
import {Message} from '../model/message';
import {InitLoadDataAction} from '../store/actions';
import {PriceRenderComponent} from './render/price-render.component';
import {TimerRenderComponent} from './render/timer-render.component';
import {StatusRenderComponent} from './render/status-render.component';

@Component({
  selector: 'app-aggrid',
  templateUrl: './aggrid.component.html',
  styleUrls: ['./aggrid.component.scss']
})
export class AggridComponent implements OnInit {
  initData$: Observable<Message[]>;
  msgs = [];
  columnDefs: any;
  getRowClass: any;
  gridApi;

  constructor(private _store: Store<ApplicationState>) {
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
      { cellRendererFramework: StatusRenderComponent,editable: true,
        headerName: 'Status', field: 'status', width: 100},
    ];

    this.getRowClass = function(params) {
      return params.data.highlightClass;
    };

    this._store.dispatch(new InitLoadDataAction());
    this.initData$ = this._store.select(getInitOrders);
  }

  ngOnInit() {

    this.initData$.subscribe(msgs => {
      console.log(msgs);
      this.msgs = msgs.filter(msg => msg && msg.id)
        .map(msg => {
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
        });
    });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }
}
