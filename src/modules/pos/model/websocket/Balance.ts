export interface Balance {
  id: string;
  port: string;
  name: string;
  getWeightTimer: number;
  balanceType: BalanceType;
}

export interface BalanceType {
  id: string;
  name: string;
  port: string;
  parity: number;
  baudRate: number;
  stopBits: number;
  dataBits: number;
  command: string;
}
