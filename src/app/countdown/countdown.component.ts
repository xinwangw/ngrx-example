import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
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
export class CountdownComponent implements OnInit, OnChanges {

  value: number = null;
  @Input() max = 100;
  start: number;
  sec = 60;
  styleExp = '100%';
  @Input() updateTime: number;
  @Input('stop') stopCountDown: boolean;
  @Output() secEmitter: EventEmitter<number> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    const t = this;
    t.start = t.updateTime + t.max * 1000;
    t._refresh();
    const source = Observable.interval(1000);
    const example = source.takeWhile(val => val <= t.max);
    example.subscribe(val => {
      if (this.sec > 0) {
        t._refresh();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['stopCountDown'] && this.stopCountDown) {
      this.stop();
    }
  }

  stop() {
    this.sec = 0;
    this.stopCountDown = true;
    this._refreshValue();
    this.styleExp = this._getStyleExp();
  }

  private  _refresh() {
    this._refreshSec();
    this._refreshValue();
    this.styleExp = this._getStyleExp();
  }

  private _refreshSec() {
    this.sec = Math.round((this.start - Date.now()) / 1000 );
    this.sec = this.sec < 0 ? 0 : this.sec;
    this.secEmitter.next(this.sec);
  }

  private _refreshValue() {
    if (this.sec === 0) {
      this.value = 0;
    } else {
      this.value = Math.round((this.start - Date.now()) / ((this.max / 100) * 1000));
    }
  }

  private _getStyleExp(): string {
    return this.value != null ? this.value + '%' : '100%';
  }

}
