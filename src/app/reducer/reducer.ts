import {createSelector} from '@ngrx/store';


import * as fromOrderState from './order-state';
import * as fromOrderStateList from './order-state-list';
import * as fromUiState from './ui-state';
import * as _ from 'lodash';
import {OrderStateList} from '../store/order-state';
import {UiState} from '../store/ui-state';

export const storeReducer = {
  orderData: fromOrderState.reducer,
  orderDataList: fromOrderStateList.reducer,
  uiState: fromUiState.reducer
};

export const getOrderData = (state) => state.orderData;
export const getOrderDataList = (state) => state.orderDataList;
export const getUiState = (state) => state.uiState;

export const getInitOrders = createSelector(
  getOrderDataList,
  (orderDataList: OrderStateList) => {
    return orderDataList.orders;
  }
);

export const getSelectedOrder = createSelector(
  getOrderDataList,
  getUiState,
  (orderDataList: OrderStateList, uiState: UiState) => {
    return orderDataList.orders.find(o => o.id === uiState.currentOrderId);
  }
);
