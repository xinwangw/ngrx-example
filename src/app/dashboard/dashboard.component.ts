import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../store/application-state';
import {BatchAddAction} from '../store/actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentTime = Date.now();

  constructor(private _store: Store<ApplicationState>) { }

  ngOnInit() {
  }
  
  batchAdd() {
    this._store.next(new BatchAddAction());
  }

}
