import {Action} from '@ngrx/store';
import {Message} from '../model/message';

export const ORDER_REFRESH_ACTION = 'ORDER_REFRESH_ACTION';
export const INIT_LOAD_DATA_ACTION = 'INIT_LOAD_DATA_ACTION';
export const INIT_DATA_LOADED_ACTION = 'INIT_DATA_LOADED_ACTION';
export const SELECT_ID_ACTION = 'SELECT_ID_ACTION';
export const BATCH_ADD_ACTION = 'BATCH_ADD_ACTION';
export const ADD_UPDATE_ORDER_ACTION = 'ADD_UPDATE_ORDER_ACTION';
export const GET_USER_ACTION = 'GET_USER_ACTION';
export const USER_LOADED_ACTION = 'USER_LOADED_ACTION';
export const DO_NOTHING_ACTION = 'DO_NOTHING_ACTION';

export class OrderRefreshAction implements Action {
  readonly type = ORDER_REFRESH_ACTION;
  constructor(public payload: Message) {}
}

export class InitLoadDataAction implements Action {
  readonly type = INIT_LOAD_DATA_ACTION;
  constructor() {}
}

export class InitDataLoadedAction implements Action {
  readonly type = INIT_DATA_LOADED_ACTION;
  constructor(public payload: Message[]) {}
}

export class SelectIdAction implements Action {
  readonly type = SELECT_ID_ACTION;
  constructor(public payload: number) {};
}

export class BatchAddAction implements Action {
  readonly type = BATCH_ADD_ACTION;
  constructor() {}
}

export class AddUpdateOrderAction implements Action {
  readonly type = ADD_UPDATE_ORDER_ACTION;
  constructor(public payload: Message) {}
}

export class GetUserAction implements Action {
  readonly type = GET_USER_ACTION;
  constructor(public payload: string) {}
}

export class UserLoadedAction implements Action {
  readonly type = USER_LOADED_ACTION;
  constructor(public payload: any) {}
}

export class DoNothingAction implements Action {
  readonly type = DO_NOTHING_ACTION;
  constructor() {}
}
