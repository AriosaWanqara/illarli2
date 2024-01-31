export interface Promotion {
  id: string;
  name: string;
  description: string;
  type: number;
  cumulative: number;
  quantity: number;
  discount: string;
  starting_date: string;
  ending_date: string;
  starting_time: string;
  ending_time: string;
  weekday: any;
  filter: string;
  order: number;
}
