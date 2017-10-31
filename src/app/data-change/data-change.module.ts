import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataInputComponent } from './data-input/data-input.component';
import {MatInputModule, MatButtonModule, MatCardModule} from '@angular/material';
import {RouterModule, Routes} from '@angular/router';
import {storeReducer} from '../reducer/reducer';
import {StoreModule} from '@ngrx/store';
import {LoadInitDataEffectService} from '../store/effects/load-init-data-effect.service';
import {EffectsModule} from '@ngrx/effects';

const routes: Routes = [
  {
    path: 'input',
    component: DataInputComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot(storeReducer),
    EffectsModule.forRoot([LoadInitDataEffectService]),
  ],
  exports: [RouterModule, MatInputModule, MatButtonModule, MatCardModule]
})
export class DataChangeModule { }
export const dataChangeRoutingComponents = [DataInputComponent];
