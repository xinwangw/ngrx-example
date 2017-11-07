import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {Actions, Effect} from '@ngrx/effects';
import {
  ADD_UPDATE_ORDER_ACTION, AddUpdateOrderAction, BATCH_ADD_ACTION, BatchAddAction, DoNothingAction,
  INIT_LOAD_DATA_ACTION,
  InitLoadDataAction
} from '../actions';
import {MessageService} from '../../service/message.service';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class LoadInitDataEffectService {
  constructor(private _actions$: Actions, private service: MessageService) { }

  @Effect() loadData$: Observable<Action> = this._actions$.ofType(INIT_LOAD_DATA_ACTION)
    .switchMap((action: InitLoadDataAction) => {
      console.log('init data calling...');
      this.service.subject.next({
          method: 'initData',
          data: 'initData'});
      return Observable.of(new DoNothingAction());
    });

  @Effect() batchAddData$: Observable<Action> = this._actions$.ofType(BATCH_ADD_ACTION)
    .switchMap((action: BatchAddAction) => {
      this.service.subject.next({
        method: 'batchAdd',
        data: 'initDbatchAddata'});
      return Observable.of(new DoNothingAction());
    });

  @Effect() addUpdateOrder$: Observable<Action> = this._actions$.ofType(ADD_UPDATE_ORDER_ACTION)
    .switchMap((action: AddUpdateOrderAction) => {
      this.service.subject.next({
        method: 'order',
        data: action.payload});
      return Observable.of(new DoNothingAction());
    });
}
