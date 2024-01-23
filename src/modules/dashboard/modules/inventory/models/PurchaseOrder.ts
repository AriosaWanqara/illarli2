import type { Provider } from "../../persons/models/Provider";
import type { Tax } from "../../products/models/products/Product";
import type { Detail, Detail2 } from "./Details";
import type { PurchaseOrderReception } from "./PurchaseOrderReception";
import type { Purchases2 } from "./Purchases";

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
export interface PurchaseToSave2 {
  date: string;
  invoice: string;
  access_key: string;
  observation: string;
  subtotal: number;
  tip: number;
  discount: number;
  total: number;
  taxes: Tax[];
  days: string;
  supplier_id: string | null;
  subsidiary_id: string;
  warehouse_id: string;
  details?: Detail2[];
}

export const createPurchaseToSaveFromPurchase = (purchase: Purchases2) => {
  let purchaseToSave: PurchaseToSave2 = {
    date: purchase.date,
    invoice: purchase.invoice,
    access_key: purchase.access_key,
    observation: purchase.observations.toString(),
    days: "0",
    discount: parseFloat(purchase.discount),
    subtotal: parseFloat(purchase.subtotal),
    taxes: purchase.taxes,
    tip: parseFloat(purchase.tip),
    total: parseFloat(purchase.total),
    supplier_id: purchase.supplier.id ?? null,
  } as PurchaseToSave2;

  purchaseToSave.details = [];
  purchase.products.map((x) => {
    let id = "";
    if (x.id) {
      id = x.id;
    }
    if (x.asociatedProduct?.id) {
      x.id = x.asociatedProduct.id;
      id = x.asociatedProduct.id;
    }
    purchaseToSave.details?.push({
      amount: x.amount,
      price: x.price,
      product: x,
      product_id: id,
      spent: x.spent ?? false,
    });
  });

  return purchaseToSave;
};
