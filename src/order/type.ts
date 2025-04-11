export enum OrderStatus {
  Open = 'OPEN',
  Approved = 'APPROVED',
  Confirmed = 'CONFIRMED',
  Sent = 'SENT',
  Completed = 'COMPLETED',
  Cancelled = 'CANCELLED',
}

type StatusHistory = Array<{
  status: OrderStatus;
  timestamp: number | Date;
  comment: string;
}>;

export type Address = {
  address: string;
  firstName: string;
  lastName: string;
  comment: string;
};
export type CreateOrderDto = {
  items: Array<{ productId: string; count: 1 }>;
  address: {
    comment: string;
    address: string;
    lastName: string;
    firstName: string;
  };
};

export type PutCartPayload = {
  product: { description: string; id: string; title: string; price: number };
  count: number;
};
export type CreateOrderPayload = {
  id?: string;
  user_id: string;
  cart_id: string;
  address: Address;
  total: number;
  comments?: string;
  payment?: {};
  status?: OrderStatus;
};

export type OrderResponse = {
  id: string;
  items: Array<{ productId: string; count: number }>;
  address: Address;
  statusHistory: StatusHistory;
};
