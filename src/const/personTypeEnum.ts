import type { Dropdown } from "@/models/Dropdown";

export enum personTypeEnum {
  RUC = "04",
  CEDULA = "05",
  PASAPORTE = "06",
  VENTA_A_CONSUMIDOR_FINAL = "07",
  IDENTIFICACION_DEL_EXTERIOR = "08",
}

export const personTypeBasicMapping: Dropdown[] = [
  { label: "RUC", value: personTypeEnum.RUC },
  { label: "CEDULA", value: personTypeEnum.CEDULA },
  { label: "PASAPORTE", value: personTypeEnum.PASAPORTE },
];
