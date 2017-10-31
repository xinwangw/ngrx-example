import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/takeWhile';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {

  value = 100;
  start = Date.now() + 60 * 1000;
  sec = 60;
  constructor() {
    setTimeout(function () {
      alert('test');
    }, 10000);
  }

  ngOnInit() {
    let t = this;
    const source = Observable.interval(1000);
    const example = source.takeWhile(val => val <= 60);
    const subscribe = example.subscribe(val => {
      if (this.sec > 0) {
        this.sec = Math.round((t.start - Date.now()) / 1000 );
        this.sec = this.sec < 0 ? 0 : this.sec;
        if (this.sec === 0) {
          this.value = 0;
        } else {
          this.value = Math.round((t.start - Date.now()) / 600);
        }
      }
    });
  }

}
