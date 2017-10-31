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

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    dataChangeRoutingComponents,
    DashboardComponent,
    CountdownComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ListRefreshModule,
    DataChangeModule,
    MatProgressBarModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot(storeReducer),
    EffectsModule.forRoot([LoadInitDataEffectService]),
  ],
  providers: [WebsocketService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
