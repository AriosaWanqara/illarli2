import type { Adjust } from "./Adjust";
import type { PurchaseOrder } from "./PurchaseOrder";
import type { Purchases, Purchases2 } from "./Purchases";
import type { Transference } from "./Transference";

export interface AdjustApiResponse {
  data: Adjust[];
}
export interface TransferencesApiResponse {
  data: Transference[];
}
export interface PurchaseOrdersApiResponse {
  data: PurchaseOrder[];
}
export interface PurchasesApiResponse {
  data: Purchases[];
}
export interface XMLUploadApiResponse {
  data: Purchases2;
}
export interface PurchaseOrderApiResponse {
  data: PurchaseOrder;
}
