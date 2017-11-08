import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import {ListRefreshModule, routingComponents} from './list-refresh/list-refresh.module';
import {DataChangeModule, dataChangeRoutingComponents} from './data-change/data-change.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import {RouterModule, Routes} from '@angular/router';
import {StoreModule} from '@ngrx/store';
import {storeReducer} from './reducer/reducer';
import {EffectsModule} from '@ngrx/effects';
import {LoadInitDataEffectService} from './store/effects/load-init-data-effect.service';
import {WebsocketService} from './service/websocket.service';
import {MessageService} from './service/message.service';
import { CountdownComponent } from './countdown/countdown.component';
import {MatProgressBarModule} from '@angular/material';
import { AggridComponent } from './aggrid/aggrid.component';
import {AgGridModule} from 'ag-grid-angular';
import {PriceRenderComponent} from './aggrid/render/price-render.component';
import {TimerRenderComponent} from "./aggrid/render/timer-render.component";
import {StatusRenderComponent} from "./aggrid/render/status-render.component";

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'ag-grid',
    component: AggridComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    dataChangeRoutingComponents,
    DashboardComponent,
    CountdownComponent,
    AggridComponent,
    PriceRenderComponent,
    TimerRenderComponent,
    StatusRenderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ListRefreshModule,
    DataChangeModule,
    MatProgressBarModule,
    AgGridModule.withComponents([ PriceRenderComponent, TimerRenderComponent, StatusRenderComponent ]),
    RouterModule.forRoot(routes),
    StoreModule.forRoot(storeReducer),
    EffectsModule.forRoot([LoadInitDataEffectService]),
  ],
  providers: [WebsocketService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
