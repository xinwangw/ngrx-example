import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { ListRefreshComponent } from './list-refresh/list-refresh.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSortModule, MatTableModule, MatTooltipModule} from '@angular/material';
import {CommonModule} from '@angular/common';
import {storeReducer} from '../reducer/reducer';
import {LoadInitDataEffectService} from '../store/effects/load-init-data-effect.service';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
const routes: Routes = [
  {
    path: 'list',
    component: ListRefreshComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatTooltipModule,
    RouterModule.forRoot(routes),
    StoreModule.forFeature('list', storeReducer),
    EffectsModule.forFeature([LoadInitDataEffectService]),
  ],
  exports: [ RouterModule, BrowserAnimationsModule, MatTableModule, MatSortModule, MatTooltipModule ]
})
export class ListRefreshModule { }
export const routingComponents = [ListRefreshComponent];
