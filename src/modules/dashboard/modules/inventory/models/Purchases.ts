import type { Provider } from "../../persons/models/Provider";

export interface Purchases {
  id: string;
  date: Date;
  sequential: number;
  user_id: string;
  supplier: Provider;
  subtotal: string;
  taxes: string;
  status: string;
  observation: string | null;
  document_type: string | null;
  document_number: string | null;
  complete: number;
  subsidiary_id: string;
  warehouse_id: string;
  items: number;
}
