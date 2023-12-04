import type { Dropdown } from "@/models/Dropdown";

export enum genderEnum {
  MALE = "Masculino",
  FEMALE = "Femenino",
}

export const allGenders: Dropdown[] = [
  { label: genderEnum.FEMALE, value: "F" },
  { label: genderEnum.MALE, value: "M" },
];
