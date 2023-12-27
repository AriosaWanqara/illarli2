import type { Detail } from "./Details";

export interface Adjust {
  id: string;
  date: string;
  sequential: number;
  user_id: string;
  status: string;
  reason: string;
  complete: number;
  warehouse_id: string;
  items: number;
  type: string;
  details: Detail[];
}
