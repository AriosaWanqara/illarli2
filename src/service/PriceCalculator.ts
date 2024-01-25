export enum PriceCalculatorType {
  QUANTITY,
  MARKUP,
  MARGIN,
}

export const PriceCalculator = (
  cost: number,
  rate: number,
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

const calculatePriceByQuantity = (
  cost: number,
  utility: number,
  rate: number
) => {
  let unitPrice = cost + utility;
  let unitPriceWithTaxes = unitPrice * (1 + rate / 100);

  return {
    unitPrice,
    unitPriceWithTaxes,
  };
};

const calculatePriceByMarkup = (
  cost: number,
  utility: number,
  rate: number
) => {
  let unitPrice = cost * (1 + utility / 100);
  let unitPriceWithTaxes = unitPrice * (1 + rate / 100);

  return {
    unitPrice,
    unitPriceWithTaxes,
  };
};

const calculatePriceByMargin = (
  cost: number,
  utility: number,
  rate: number
) => {
  let unitPrice = cost / (1 - utility / 100);
  let unitPriceWithTaxes = unitPrice * (1 + rate / 100);

  return {
    unitPrice,
    unitPriceWithTaxes,
  };
};
