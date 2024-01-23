import type { Permission } from "./Permission";
import type { Rol } from "./Rol";

export interface User {
  id: string;
  name: string;
  email: string;
  email_verified_at: boolean;
  roles: Rol[];
  permissions: Permission[];
  subsidiaries: Subsidiary[];
}

export interface Subsidiary {
  id: string;
  businessname: string;
  code: null;
  address: string;
  phone: string;
  active: number;
  differentiated_billing: number;
  pos_route: null;
  checkouts: Checkout[];
}

export interface Checkout {
  id: string;
  code: string;
  active: number;
  observation: string;
  sequential: null;
  document_type: string[];
  subsidiary_id: string;
}
