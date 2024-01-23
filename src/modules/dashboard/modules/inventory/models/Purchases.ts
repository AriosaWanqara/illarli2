import type { Provider } from "../../persons/models/Provider";
import type { Product, Tax } from "../../products/models/products/Product";

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
export interface Purchases2 {
  date: string;
  invoice: string;
  authorized: string;
  access_key: string;
  tip: string;
  subtotal: string;
  total: string;
  discount: string;
  currency: string;
  taxes: Tax[];
  observations: string[];
  products: Product[];
  customer: Customer;
  supplier: Provider;
  payments: Payments;
}

export interface Customer {
  name: string;
  identity: string;
  address: string;
  identity_type: string;
}
export interface Payments {
  code_sri: string;
  amount: string;
  term: string;
  unit: string;
}
