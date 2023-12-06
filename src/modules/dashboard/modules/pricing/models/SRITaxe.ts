export interface SRITaxe {
  id: string;
  name: string;
  percentage: null | string;
  description: string;
}

export interface SRITaxeParent {
  id: string;
  name: string;
  code_sri: string;
  rates: SRITaxe[];
}
