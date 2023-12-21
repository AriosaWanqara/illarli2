export interface PurchaseOrderReception {
  id: string;
  date?: string;
  purchase_order_id: string;
  details: { id: string; receive_amount: number }[];
}
