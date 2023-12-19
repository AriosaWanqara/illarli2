import type { civilStatusEnum } from "../constant/civilStatusEnum";

export interface Provider {
  id: string;
  code: string | null;
  name: string;
  businessname: null;
  identity: string;
  address: string;
  phones: string[];
  emails: string[];
  roles: string[];
  force_accounting: number;
  foreign: number;
  artisan: string | null;
  special_taxpayer: string | null;
  identity_type: string;
  gender: string;
  civil_status: civilStatusEnum;
  person_type: string | null;
}
