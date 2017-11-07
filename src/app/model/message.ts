export interface MessageBody {
  product: string;
  price: number;
}
export interface Message {
  id: number;
  author: string;
  message: MessageBody;
  highlightClass?: string;
  updatedTime?: number;
  expireTime?: number;
  status?: string;
}
export interface SendMessage {
  method: string;
  data: any;
}
