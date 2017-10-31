import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {SendMessage} from '../model/message';

@Injectable()
export class WebsocketService {

  constructor() { }

  private subject: Subject<MessageEvent>;

  private webSocket: WebSocket;

  public connect(url): Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
    }
    return this.subject;
  }

  onOpen = function(ev) {
    console.log('init load');
  }

  private create(url): Subject<MessageEvent> {
    const t = this;
    if (!this.webSocket) {
      this.webSocket = new WebSocket(url);
      this.webSocket.onopen = t.onOpen;
    }
    const ws = this.webSocket;

    const observable = Observable.create(
      (obs: Observer<MessageEvent>) => {
        ws.onmessage = obs.next.bind(obs);
        ws.onerror = obs.error.bind(obs);
        ws.onclose = obs.complete.bind(obs);
        return ws.close.bind(ws);
      });
    const observer = {
      next: (data: SendMessage) => {
        console.log(ws.readyState, WebSocket.OPEN);
        if (ws.readyState === WebSocket.OPEN) {
          const sendData = {};
          sendData[data.method] = data.data;
          console.log('send data:', sendData);
          ws.send(JSON.stringify(sendData));
        }
      }
    };
    return Subject.create(observer, observable);
  }
}
