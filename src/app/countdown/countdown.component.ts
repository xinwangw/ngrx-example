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
         [attr.aria-valuenow]="value"
         aria-valuemin="0" aria-valuemax="100">
      <span [attr.id]="id"></span>
    </div>
  </div>`
})
export class CountdownComponent implements OnInit, OnChanges {
  @Input() id: string;
  value: number = null;
  @Input() max = 100;
  start: number;
  sec = 60;
  styleExp = '100%';
  @Input() updateTime: number;
  @Input() expireTime: number;
  @Input('stop') stopCountDown: boolean;
  @Output() secEmitter: EventEmitter<number> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    const t = this;
    t.start = t.updateTime + t.max * 1000;
    if (t.expireTime) {
      t.start = t.expireTime;
    }
    t._refresh();
    const end = t.sec;
    const source = Observable.timer(0, 1000);
    const example = source.takeWhile(val => val <= end && !this.stopCountDown);
    example.subscribe(val => {
      if (this.sec > 0 && !this.stopCountDown) {
        t._refresh();
        this._updateSecEle();
        if (this.sec === 0) {
          this.secEmitter.next(this.sec);
        }
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
    this._updateSecEle();
  }

  private  _refresh() {
    this._refreshSec();
    this._refreshValue();
    this.styleExp = this._getStyleExp();
  }

  private _refreshSec() {
    this.sec = Math.round((this.start - Date.now()) / 1000 );
    this.sec = this.sec < 0 ? 0 : this.sec;
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

  private _updateSecEle(){
    const secEle = document.getElementById(this.id);
    if (secEle) {
      secEle.innerText = this.sec > 0 ? this.sec + 's' : '';
      secEle.parentElement.style.width = this._getStyleExp();
    }
  }

}
