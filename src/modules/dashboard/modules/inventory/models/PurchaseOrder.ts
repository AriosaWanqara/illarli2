import type { Provider } from "../../persons/models/Provider";
import type { Detail } from "./Details";
import type { PurchaseOrderReception } from "./PurchaseOrderReception";

export interface PurchaseOrder {
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

export interface PurchaseOrderToSave {
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

export interface PurchaseToSave {
  id: string;
  date?: string;
  status?: string;
  items?: number;
  user_id?: string;
  observation?: string;
  subsidiary_id?: string;
  warehouse_id?: string;
  supplier?: Provider;
  details?: Detail[];
}
