import {MessageBody} from '../model/message';

export interface OrderState {
  id: number;
  author: string;
  message: MessageBody;
  highlightClass?: string;
  updatedTime?: number;
}

export const INIT_ORDER_STATE: OrderState =  {
  id: null,
  author: null,
  message: {
    product: null,
    price: null
  }
}

export interface OrderStateList {
  orders: OrderState[];
}
