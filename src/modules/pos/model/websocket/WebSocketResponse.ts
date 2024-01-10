import type { Balance } from "./Balance";

export interface balanceRead {
  balance: Balance;
  message: string;
  disconnectTime?: number;
}
