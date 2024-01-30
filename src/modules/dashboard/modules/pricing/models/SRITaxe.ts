export interface SRITaxe {
  id: string;
  name: string;
  rate: string;
  code: string;
  parent: string;
  description: string;
}

export interface SRITaxeParent {
  id: string;
  name: string;
  code: string;
  rates: SRITaxe[];
}
