export interface PaymentMethod {
  id: string;
  name: string;
  code_sri: string;
  default: 0 | 1;
  days: number;
  accounting_account: string;
}
