import type { Product } from "../../products/models/products/Product";

export interface Detail {
  id?: string;
  order_amount: number;
  receive_amount?: number;
  missing_amount?: number;
  amount?: number;
  unit_price: number;
  observation?: string;
  product: Product;
}
