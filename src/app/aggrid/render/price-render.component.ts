import {AgRendererComponent} from 'ag-grid-angular';
import {IAfterGuiAttachedParams, ICellRendererParams} from 'ag-grid';
import {Component} from '@angular/core';

@Component({
  selector: 'app-price-cell',
  template: `{{params.value | currency:'AUD':'symbol-narrow':'1.2-2'}}`
})
export class PriceRenderComponent implements AgRendererComponent {
  params: any;

  refresh(params: any): boolean {
    throw new Error('Method not implemented.');
  }

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }
  afterGuiAttached(params?: IAfterGuiAttachedParams): void {
    throw new Error('Method not implemented.');
  }

}
