export interface Subproduct {
  id: string;
  name: string;
  sku: string;
  upc: string;
  mmu: string;
  slug: string;
  description: string;
  price: number;
  unit_id: string;
  stock_min: number;
  stock_max: number;
  product_type_id: string;
  categoriesId: string[];
  brand_id: string;
  taxes: string[];
  warehouse_id: string;
  parent_product_id: string;
  amount: number;
}
