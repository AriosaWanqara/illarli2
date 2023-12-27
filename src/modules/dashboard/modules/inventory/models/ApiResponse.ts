import type { Adjust } from "./Adjust";
import type { PurchaseOrder } from "./PurchaseOrder";
import type { Purchases } from "./Purchases";

export interface AdjustApiResponse {
  data: Adjust[];
}
export interface PurchaseOrdersApiResponse {
  data: PurchaseOrder[];
}
export interface PurchasesApiResponse {
  data: Purchases[];
}
export interface PurchaseOrderApiResponse {
  data: PurchaseOrder;
}
