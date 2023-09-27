import type { ID, DateTime } from "./base";
import type { Wallet, Vault, Whitelist } from "./wallet";
import type { Preferences } from "./preferences";
export type Role = {
  __typename: string;
  id: ID;
  name: string;
  guard_name: string;
}
export type User = {
  __typename: string;
  id: ID;
  name: string;
  username: string;
  email: string;
  email_verified_at?: DateTime;
  avatar: string;
  created_at?: DateTime;
  updated_at?: DateTime;
  enable2fa: Boolean;
  wallets: Wallet[];
  vault: Vault[];
  whitelist: Whitelist[];
  preferences: Preferences;
  roles: Role[]
};

export type NewUserInput = {
  email: String;
  username: String;
  password: String;
};
