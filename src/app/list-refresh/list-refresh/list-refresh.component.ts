import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/merge';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {MatSort} from '@angular/material';
import {Component, OnInit, ViewChild} from '@angular/core';
import * as _ from 'lodash';
import {ApplicationState} from '../../store/application-state';
import {Store} from '@ngrx/store';
import {Message} from '../../model/message';
import {getInitOrders, getOrderData} from '../../reducer/reducer';
import {MessageService} from '../../service/message.service';
import {AddUpdateOrderAction, SelectIdAction} from '../../store/actions';

@Component({
  selector: 'app-list-refresh',
  templateUrl: './list-refresh.component.html',
  styleUrls: ['./list-refresh.component.css']
})
export class ListRefreshComponent implements OnInit {

  displayedColumns = ['id', 'author', 'product', 'price', 'expireTime', 'action', 'status'];
  exampleDatabase: ExampleDatabase;
  dataSource: ExampleDataSource;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: MessageService, private _store: Store<ApplicationState>) {
    this.service.dataSubject.subscribe(action => {
      console.log(action);
      _store.dispatch(action);
    });
    this.exampleDatabase = new ExampleDatabase(_store);
  }

  ngOnInit() {
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.sort);
  }

  selectId(id) {
    console.log(id);
    this._store.dispatch(new SelectIdAction(id));
  }

  stop(row) {
    console.log(row);
    row.stop = true;
    row.status = 'Completed';
    this._store.dispatch(new AddUpdateOrderAction({
      id: row.id,
      author: row.author,
      message: {
        product: row.product,
        price: row.price,
      },
      status: row.status
    }));
  }

  updateStatus(sec, row) {
    if (sec === 0 && row.status === 'PENDING') {
      row.status = 'Expired';
    }
  }
}

export interface Element {
  id: number;
  author: string;
  product: string;
  price: number;
  highlightClass: string;
  updatedTime: number;
  expireTime: number;
  action?: number;
  stop?: boolean;
  status?: string;
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleDatabase {
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<Element[]> = new BehaviorSubject<Element[]>([]);
  get data(): Element[] { return this.dataChange.value; }
  initData$: Observable<Message[]>;

  constructor(private _store: Store<ApplicationState>) {
    this.initData$ = this._store.select(getInitOrders);

    this.initData$.subscribe(msgs => {
      console.log(msgs);
      this.dataChange.next(msgs.filter(msg => msg && msg.id)
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
      }));
    });
  }
}

export class ExampleDataSource extends DataSource<Element> {

  constructor(private _exampleDatabase: ExampleDatabase, private _sort: MatSort) {
    super();
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Element[]> {
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      return this.getSortedData();
    });
  }

  disconnect() {}

  /** Returns a sorted copy of the database data. */
  getSortedData(): Element[] {
    const data = this._exampleDatabase.data.slice();
    if (!this._sort.active || this._sort.direction === '') { return data; }

    return data.sort((a, b) => {
      let propertyA: number|string = '';
      let propertyB: number|string = '';

      switch (this._sort.active) {
        case 'author': [propertyA, propertyB] = [a.author, b.author]; break;
        case 'product': [propertyA, propertyB] = [a.product, b.product]; break;
        case 'price': [propertyA, propertyB] = [a.price, b.price]; break;
        case 'expireTime': [propertyA, propertyB] = [a.expireTime, b.expireTime]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
