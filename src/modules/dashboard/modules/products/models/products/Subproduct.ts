import type { baseProduct } from "./Product";

export interface Subproduct extends baseProduct {
  upc: string;
  mmu: string;
  slug: string;
  price: number;
  unit_id: string;
  stock_min: number;
  stock_max: number;
  product_type_id: string;
  taxes: { id: string }[];
  warehouse_id: string;
  parent_product_id: string;
  amount: number;
}
