import type { Dropdown } from "@/models/Dropdown";

export enum civilStatusEnum {
  SINGLE = "0",
  MARRIED = "1",
  WIDOWER = "2",
  DIVORCED = "3",
  FREE_UNION = "4",
}

export const allCivilStatusEnum: Dropdown[] = [
  { label: "Casado", value: civilStatusEnum.MARRIED },
  { label: "Soltero", value: civilStatusEnum.SINGLE },
  { label: "Viudo", value: civilStatusEnum.WIDOWER },
  { label: "Divorciado", value: civilStatusEnum.DIVORCED },
  { label: "Union libre", value: civilStatusEnum.FREE_UNION },
];
