import type { SRITaxe } from "../../../pricing/models/SRITaxe";
import type { baseProduct } from "./Product";

export interface StandarProduct extends baseProduct {
  price: number;
  unit_id: string;
  stock_min: number;
  stock_max: number;
  stock: number;
  product_type_id: string;
  warehouse_id: string;
  taxes: SRITaxe[];
}
