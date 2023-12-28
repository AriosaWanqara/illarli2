import type { Detail } from "./Details";

export interface Transference {
  id: string;
  shipping_date: string;
  reception_date: string;
  sequential: number;
  sender_user_id: string;
  recepter_user_id: string;
  status: string;
  observation: null | string;
  complete: number;
  shipping_warehouse_id: string;
  reception_warehouse_id: string;
  items: number;
  details: Detail[];
}
