import {INIT_ORDER_STATE, OrderStateList} from '../store/order-state';
import {Action} from '@ngrx/store';
import {
  INIT_DATA_LOADED_ACTION, InitDataLoadedAction, ORDER_REFRESH_ACTION,
  OrderRefreshAction
} from '../store/actions';
import * as _ from 'lodash';

export function reducer(state: OrderStateList = {orders: [INIT_ORDER_STATE]}, action: Action): OrderStateList {
  switch (action.type) {
    case INIT_DATA_LOADED_ACTION:
      return handleInitDataLoadedAction(state, <any>action);
    case ORDER_REFRESH_ACTION:
      return handleOrderRefreshAction(state, <any>action);
    default:
      return state;
  }
}

export function handleInitDataLoadedAction(state: OrderStateList, action: InitDataLoadedAction): OrderStateList {
  const orderList = action.payload;
  const newState: OrderStateList = Object.assign({}, state);
  newState.orders = orderList.map(o => Object.assign({}, o));
  return newState;
}

export function handleOrderRefreshAction(state: OrderStateList, action: OrderRefreshAction): OrderStateList {
  const order = action.payload;
  console.log('handleOrderRefreshAction in OrderStateList', order);
  const newState: OrderStateList = _.cloneDeep(state);
  if (order && order.id) {
    order.highlightClass = 'flash';
    const index = _.findIndex(newState.orders, e => e.id === order.id);
    newState.orders.map(o => o.highlightClass = '');
    if (index > -1) {
      newState.orders[index] = order;
      newState.orders[index].highlightClass = order.highlightClass;
    } else {
      newState.orders.push(order);
    }
  }
  return newState;
}
