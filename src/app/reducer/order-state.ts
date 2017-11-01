import {INIT_ORDER_STATE, OrderState} from '../store/order-state';
import {Action} from '@ngrx/store';
import {
  INIT_DATA_LOADED_ACTION, InitDataLoadedAction, ORDER_REFRESH_ACTION,
  OrderRefreshAction
} from '../store/actions';

export function reducer(state: OrderState = INIT_ORDER_STATE, action: Action): OrderState {
  switch (action.type) {
    case ORDER_REFRESH_ACTION:
      return handleOrderRefreshAction(state, <any>action);
    default:
      return state;
  }
}

export function handleOrderRefreshAction(state: OrderState, action: OrderRefreshAction): OrderState {
  const message = action.payload;
  const newState: OrderState = Object.assign({}, state);
  newState.id = message.id;
  newState.message = message.message;
  newState.author = message.author;
  newState.highlightClass = 'flash';
  newState.updatedTime = Date.now();
  console.log(newState);
  return newState;
}


