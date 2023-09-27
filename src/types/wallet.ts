import type { ID, DateTime } from "./base";
export type ActiveAddress = {
  id: ID;
  address: string;
  status: boolean;
  wallet_id: ID;
};
export type Currency = {
  id: ID;
  active: boolean;
  code: string;
  current_price: number;
  last_price?: number;
  name: string;
  logo: string;
  price_updated_at?: DateTime;
  description?: string;
  subunits?: number;
  created_at?: DateTime;
  updated_at?: DateTime;
  quotes: {
    values: {
      [key: string]: Number;
    };
  };
};
export type CurrenciesData = {
  [key: string]: Currency;
};
export type Wallet = {
  id: ID;
  free_amount: number;
  locked_balance: number;
  created_at: DateTime;
  updated_at: DateTime;
  activeAddress: ActiveAddress[];
  currency: Currency;
};
export type Vault = {
  amount: number;
  currency: string;
};
export type Whitelist = {
  address: string;
  address_name: string;
  currency: string;
};
