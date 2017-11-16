export interface UiState {
  currentOrderId: number;
  pendingOrderCount: number;
  userData: any;
}

export const INIT_UI_STATE: UiState = {
  currentOrderId: 0,
  pendingOrderCount: 0,
  userData: {}
};
