export interface StandarProduct {
  id: string;
  name: string;
  sku: string;
  brand_id: string;
  description: string;
  price: number;
  unit_id: string;
  stock_min: number;
  stock_max: number;
  stock: number;
  categoriesId: string[];
  product_type_id: string;
  warehouse_id: string;
  taxes: string[];
  image_file: string;
}
