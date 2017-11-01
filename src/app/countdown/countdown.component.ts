import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/takeWhile';

@Component({
  selector: 'app-countdown',
  template: `
  <div class="progress">
    <div class="progress-bar" role="progressbar"
         [ngStyle]="{'width': styleExp}" [attr.aria-valuenow]="value"
         aria-valuemin="0" aria-valuemax="100">
      <span *ngIf="value">{{sec}}s</span>
    </div>
  </div>`,
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {

  @Input() value: number = null;
  start: number;
  sec = 60;
  styleExp: string = '100%';
  @Input() updateTime: number;

  constructor() {
  }

  ngOnInit() {
    const t = this;
    t.start = t.updateTime + 60 * 1000;
    t.sec = Math.round((t.start - Date.now()) / 1000 );
    t.styleExp = this.value + '%';
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
        t.styleExp = t.getStyleExp();
      }
    });
  }

  getStyleExp(): string {
    return this.value != null ? this.value + '%' : '100%';
  }

}
