import type { Dropdown } from "@/models/Dropdown";

export enum PriceCalculatorType {
  QUANTITY,
  MARKUP,
  MARGIN,
}

export const PriceCalculator = (
  cost: number,
  rate: number[],
  utility: number,
  type: PriceCalculatorType
): { unitPrice: number; unitPriceWithTaxes: number } => {
  switch (type) {
    case PriceCalculatorType.MARGIN:
      return calculatePriceByMargin(cost, utility, rate);
    case PriceCalculatorType.MARKUP:
      return calculatePriceByMarkup(cost, utility, rate);
    case PriceCalculatorType.QUANTITY:
      return calculatePriceByQuantity(cost, utility, rate);
    default:
      return {
        unitPrice: 0,
        unitPriceWithTaxes: 0,
      };
  }
};

export const reverseCalculator = (
  price: number,
  rate: { name: string; value: number }[]
): Dropdown[] => {
  let summary: Dropdown[] = [];
  let sum = 0;
  rate.map((x) => {
    sum = sum + price * (x.value / 100);
    summary.push({
      label: x.name,
      value: (price * (x.value / 100)).toFixed(2),
    });
  });
  summary.unshift({
    label: "P.U",
    value: (price - sum).toFixed(2),
  });
  return summary;
};

const calculatePriceByQuantity = (
  cost: number,
  utility: number,
  rate: number[]
) => {
  let unitPrice = cost + utility;
  let unitPriceWithTaxes = unitPrice;
  rate.map((x) => {
    let taxesValue = unitPrice * (x / 100);
    unitPriceWithTaxes = unitPriceWithTaxes + taxesValue;
  });
  return {
    unitPrice,
    unitPriceWithTaxes,
  };
};

const calculatePriceByMarkup = (
  cost: number,
  utility: number,
  rate: number[]
) => {
  let unitPrice = cost * (1 + utility / 100);
  let unitPriceWithTaxes = unitPrice;
  rate.map((x) => {
    let taxesValue = unitPrice * (x / 100);
    unitPriceWithTaxes = unitPriceWithTaxes + taxesValue;
  });

  return {
    unitPrice,
    unitPriceWithTaxes,
  };
};

const calculatePriceByMargin = (
  cost: number,
  utility: number,
  rate: number[]
) => {
  if (utility >= 100) {
    utility = 99;
  }
  let unitPrice = cost / (1 - utility / 100);
  let unitPriceWithTaxes = unitPrice;
  rate.map((x) => {
    let taxesValue = unitPrice * (x / 100);
    unitPriceWithTaxes = unitPriceWithTaxes + taxesValue;
  });

  return {
    unitPrice,
    unitPriceWithTaxes,
  };
};
