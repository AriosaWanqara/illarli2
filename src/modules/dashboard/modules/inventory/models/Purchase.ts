import type { Provider } from "../../persons/models/Provider";
import type { Product } from "../../products/models/products/Product";

export interface Purchase {
  id: string;
  date: Date;
  user_id: string;
  supplier: Provider;
  subtotal: string;
  taxes: string;
  status: string;
  observation: string;
  document_type: string;
  receipt_number: string;
  complete: number;
  subsidiary_id: string;
  warehouse_id: string;
  items: number;
}

export interface PurchaseToSave {
  id: string;
  date: string;
  items: number;
  user_id: string;
  observation: string;
  subsidiary_id: string;
  warehouse_id: string;
  supplier: Provider;
  details: Detail[];
}

export interface Detail {
  order_amount: number;
  unit_price: number;
  observation: string;
  product: Product;
}
