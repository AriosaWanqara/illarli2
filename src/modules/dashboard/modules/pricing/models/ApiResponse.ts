import type { PaymentMethod } from "./PaymentMethod";
import type { Promotion } from "./Promotion";
import type { Rate } from "./Rate";
import type { SRITaxeParent } from "./SRITaxe";

export interface SRITaxesApiResponse {
  data: SRITaxeParent[];
  links: Links;
  meta: Meta;
}
export interface PaymentMethodsApiResponse {
  data: PaymentMethod[];
  links: Links;
  meta: Meta;
}
export interface PaymentMethodApiResponse {
  data: PaymentMethod;
  links: Links;
  meta: Meta;
}
export interface RatesApiResponse {
  data: Rate[];
  links: Links;
  meta: Meta;
}
export interface RateApiResponse {
  data: Rate;
  links: Links;
  meta: Meta;
}
export interface PromotionsApiResponse {
  data: Promotion[];
  links: Links;
  meta: Meta;
}
export interface PromotionApiResponse {
  data: Promotion;
  links: Links;
  meta: Meta;
}

export interface Links {
  first: string;
  last: string;
  prev: null;
  next: null;
}

export interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  links: Link[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface Link {
  url: null | string;
  label: string;
  active: boolean;
}
