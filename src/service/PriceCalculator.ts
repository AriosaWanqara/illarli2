import type { Dropdown } from "@/models/Dropdown";
import type { Product } from "@/modules/dashboard/modules/products/models/products/Product";

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

export const calculateSummaryFromProducts = (
  products: Partial<Product>[]
): Dropdown[] => {
  let summary: Dropdown[] = [];
  let subtotal = 0;
  let total = 0;
  products.map((x) => {
    let amount = x.amount ?? 1;
    subtotal = amount * parseFloat(x.price!) + subtotal;
    x.taxes!.map((y) => {
      let taxe = (y.rate / 100) * (parseFloat(x.price!) * amount);
      total += taxe;
      let sum = summary.find((z) => z.label == y.name);
      if (!sum) {
        summary.push({
          value: taxe.toFixed(2),
          label: y.name,
        });
      } else {
        let value = sum.value;
        let k = taxe + parseFloat(value);
        sum.value = k.toFixed(2);
      }
    });
  });
  total += subtotal;
  summary.unshift({
    value: subtotal.toFixed(2),
    label: "subtotal",
  });
  summary.push({
    value: total.toFixed(2),
    label: "total",
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
