import {Component, OnInit} from '@angular/core';
import {Message} from '../../model/message';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../store/application-state';
import {Observable} from 'rxjs/Observable';
import {OrderState} from '../../store/order-state';
import {getSelectedOrder} from '../../reducer/reducer';
import {AddUpdateOrderAction} from '../../store/actions';

@Component({
  selector: 'app-data-input',
  templateUrl: './data-input.component.html',
  styleUrls: ['./data-input.component.css']
})
export class DataInputComponent implements OnInit {

  message: Message = {
    id: 1,
    author: 'test',
    message: {
      product: 't',
      price: 1.1
    }
  };

  selectedOrder$: Observable<OrderState>;

  constructor(private _store: Store<ApplicationState>) {
    this.selectedOrder$ = _store.select(getSelectedOrder);
  }

  ngOnInit() {
    this.selectedOrder$.subscribe(o => {
      if (o) {
        this.message = o;
        this.message.status = 'PENDING';
      }
    });
  }

  sendMsg() {
    console.log('new message from client to websocket: ', this.message);
    this._store.dispatch(new AddUpdateOrderAction(this.message));
    this.message = {
      id: 0,
      author: '',
      message: {
        product: '',
        price: 0
      }
    };
  }

}
