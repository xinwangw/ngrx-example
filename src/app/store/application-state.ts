import {INIT_ORDER_STATE, OrderState, OrderStateList} from './order-state';
import {INIT_UI_STATE, UiState} from './ui-state';

export interface ApplicationState {
  orderData: OrderState;
  orderDataList: OrderStateList;
  uiState: UiState;
}


export const INIT_APPLICATION_STATE: ApplicationState = {
  orderData: INIT_ORDER_STATE,
  orderDataList: {orders: [INIT_ORDER_STATE]},
  uiState: INIT_UI_STATE
};
