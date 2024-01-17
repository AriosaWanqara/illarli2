import type { baseProduct } from "./Product";

export interface ComboProduct extends baseProduct {
  sku: string;
  upc: string;
  mmu: string;
  price: number;
  unit_id: string;
  stock_min: number;
  stock_max: number;
  product_type_id: string;
  warehouse_id: string;
  taxes: string[];
  products: ComboProductChild[];
}

export interface ComboProductChild {
  child_product_id?: string;
  product_relation_id?: string;
  amount: number;
  price: number;
}
