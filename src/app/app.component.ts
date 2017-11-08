import { Component } from '@angular/core';
import {MessageService} from './service/message.service';
import {ApplicationState} from './store/application-state';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private service: MessageService, private _store: Store<ApplicationState>) {
    this.service.subject.subscribe();
    this.service.dataSubject.subscribe(action => {
      console.log(action);
      _store.dispatch(action);
    });
  }
}
