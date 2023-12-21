import type { Provider } from "../../persons/models/Provider";
import type { Product } from "../../products/models/products/Product";
import type { PurchaseOrderReception } from "./PurchaseOrderReception";

export interface Purchase {
  id: string;
  date: string;
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
  partials: PurchaseOrderReception[];
  details?: Detail[];
}

export interface PurchaseToSave {
  id: string;
  date?: string;
  items?: number;
  status?: string;
  user_id?: string;
  observation?: string;
  subsidiary_id?: string;
  warehouse_id?: string;
  supplier?: Provider;
  details?: Detail[];
}

export interface Detail {
  id?: string;
  order_amount: number;
  receive_amount?: number;
  missing_amount?: number;
  amount?: number;
  unit_price: number;
  observation: string;
  product: Product;
}
