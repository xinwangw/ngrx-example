import {Action} from '@ngrx/store';
import {
  ORDER_REFRESH_ACTION, OrderRefreshAction,
  SELECT_ID_ACTION, SelectIdAction
} from '../store/actions';
import {INIT_UI_STATE, UiState} from '../store/ui-state';

export function reducer(state: UiState = INIT_UI_STATE, action: Action): UiState {
  switch (action.type) {
    case SELECT_ID_ACTION:
      return handleSelectIdAction(state, <any>action);
    case ORDER_REFRESH_ACTION:
      return handleOrderRefreshActionAction(state, <any>action);
    default:
      return state;
  }
}

export function handleSelectIdAction(state: UiState, action: SelectIdAction): UiState {
  const id = action.payload;
  const newState: UiState = Object.assign({}, state);
  newState.currentOrderId = id;
  return newState;
}

export function handleOrderRefreshActionAction(state: UiState, action: OrderRefreshAction): UiState {
  const newState: UiState = Object.assign({}, state);
  newState.currentOrderId = 0;
  return newState;
}

