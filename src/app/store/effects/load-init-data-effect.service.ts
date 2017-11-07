import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {Actions, Effect} from '@ngrx/effects';
import {BATCH_ADD_ACTION, BatchAddAction, DoNothingAction, INIT_LOAD_DATA_ACTION, InitLoadDataAction} from '../actions';
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
}
