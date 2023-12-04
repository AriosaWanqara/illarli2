import type { Cashdrawer } from "@dashboard/modules/config/models/Cashdrawer";
import type { Subsidiary } from "@dashboard/modules/config/models/Subsidiary";
import type { Rol } from "@auth/models/Rol";

export interface User {
  id: string;
  name: string;
  username: string;
  password: string;
  email: string;
  subsidiaries: Subsidiary[];
  checkouts: Cashdrawer[];
  roles: Rol[];
  email_verified_at: null;
}

export interface userToSave {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  subsidiariesId: string[];
  checkoutsId: string[];
  roles: string[];
}
