import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {WebsocketService} from './websocket.service';
import {AppSettings} from '../app.settings';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import {ApplicationState} from '../store/application-state';
import {Store, Action} from '@ngrx/store';
import {InitDataLoadedAction, InitLoadDataAction, OrderRefreshAction} from '../store/actions';

@Injectable()
export class MessageService {
  public subject: Subject<any>;
  public dataSubject: Subject<Action> = new Subject<Action>();

  constructor(wsService: WebsocketService) {
    const t = this;
    wsService.onOpen = function (ev) {
      t.dataSubject.next(new InitLoadDataAction());
    };
    this.subject = <Subject<any>>wsService
      .connect(AppSettings.CHAT_URL)
      .map((response: MessageEvent): any => {
        const data = JSON.parse(response.data);
        console.log('Response: ', data);
        if (data['order']) {
          data['order'].id = Number(data['order'].id);
          t.dataSubject.next(new OrderRefreshAction(data['order']));
        }
        if (data['initData']) {
          t.dataSubject.next(new InitDataLoadedAction(data['initData']));
        }
        return data;
      });

  }
}
