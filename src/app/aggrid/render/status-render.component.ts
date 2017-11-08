import {AgRendererComponent} from 'ag-grid-angular';
import {IAfterGuiAttachedParams, ICellRendererParams} from 'ag-grid';
import {Component, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-price-cell',
  template: `{{value}}`
})
export class StatusRenderComponent implements AgRendererComponent, OnChanges {


  params: any;
  value: any;
  current = Date.now();
  refresh(params: any): boolean {
    console.log(params.data);
    return true;
  }

  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.value = params.data.expireTime <= this.current && params.value === 'PENDING' ? 'Expired' : params.value;
  }
  afterGuiAttached(params?: IAfterGuiAttachedParams): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

}
