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
import {MatProgressBarModule, MatMenuModule} from '@angular/material';
import { AggridComponent } from './aggrid/aggrid.component';
import {AgGridModule} from 'ag-grid-angular';
import {PriceRenderComponent} from './aggrid/render/price-render.component';
import {TimerRenderComponent} from './aggrid/render/timer-render.component';
import {StatusRenderComponent} from './aggrid/render/status-render.component';
import { ExampleComponent } from './example/example.component';
import { NongrxComponent } from './nongrx/nongrx.component';
import { PendingCountComponent } from './pending-count/pending-count.component';
import { PendingCountNoNgRxComponent } from './pending-count-no-ng-rx/pending-count-no-ng-rx.component';
import {SharedInternalEventService} from './service/shared-internal-event.service';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {HttpClientModule} from '@angular/common/http';
import {UserService} from "./service/user.service";

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'ag-grid',
    component: AggridComponent
  },
  {
    path: 'example',
    component: ExampleComponent
  },
  {
    path: 'nongrx',
    component: NongrxComponent
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
    StatusRenderComponent,
    ExampleComponent,
    NongrxComponent,
    PendingCountComponent,
    PendingCountNoNgRxComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ListRefreshModule,
    DataChangeModule,
    MatProgressBarModule,
    MatMenuModule,
    AgGridModule.withComponents([ PriceRenderComponent, TimerRenderComponent, StatusRenderComponent ]),
    RouterModule.forRoot(routes),
    StoreModule.forRoot(storeReducer),
    EffectsModule.forRoot([LoadInitDataEffectService]),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    })
  ],
  providers: [WebsocketService, MessageService, SharedInternalEventService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
