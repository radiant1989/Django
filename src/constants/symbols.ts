import type { InjectionKey } from "vue";
import { User, Wallet, Vault, Whitelist, Preferences } from "~/types";

export const AUTH = Symbol() as InjectionKey<{
  authType: Ref<string>;
  modalVisible: Ref<boolean>;
  isLoggedIn: ComputedRef<boolean>;
  me: Ref<User | null>;
  loading: Ref<boolean>;
  emailOrUsername: Ref<string>;
  password: Ref<string>;
  login: () => void;
  refetch: () => void;
  // TODO: need to figure out correct type.
  subscribeToMore: (data: any) => void;
}>;

export const THEME = Symbol() as InjectionKey<{
  breakpoints: {
    [key in "sm" | "md" | "lg" | "lxl" | "xl" | "xxl"]: number;
  };
  screen: ComputedRef<{
    sm: boolean;
    md: boolean;
    lg: boolean;
    lxl: boolean;
    xl: boolean;

    width: number;
    height: number;
  }>;
  muteBodyScroll: Ref<number>; // consider multi-overlays
}>;

export const RIGHTBAR_STATE = Symbol() as InjectionKey<{
  isRightbarOpen: ComputedRef<boolean>;
  rightbarContentType: Ref<string>;
  closeRightBar: () => void;
}>;

export const CONTAINER = Symbol() as InjectionKey<{
  containerScreen: ComputedRef<{
    sm: boolean;
    md: boolean;
    lg: boolean;
    lxl: boolean;
    xl: boolean;
    width: number;
    height: number;
  }>;
}>;

export const SITE_LOADING = Symbol() as InjectionKey<{
  initialRendering: Ref<boolean>;
  mounted: Ref<boolean>;
  ready: ComputedRef<boolean>;
  loadings: Ref<string[]>;
  addLoading: (maxTimeout?: number) => () => void;
  useAddLoading: (maxTimeout?: number) => {
    add: () => void;
    remove: (timeout?: number) => void;
  };
  onInitialRendering: (callback: () => void) => void;
}>;

export const PAGE_LOADING = Symbol() as InjectionKey<{
  ready: ComputedRef<boolean>;
  loadings: Ref<string[]>;
  addLoading: () => () => void;
  useAddLoading: (maxTimeout?: number) => {
    add: () => void;
    remove: (timeout?: number) => void;
  };
  onPageRendering: (callback: () => void) => void;
}>;

export const SUB_PAGE_LOADING = Symbol() as InjectionKey<{
  ready: ComputedRef<boolean>;
  loadings: Ref<string[]>;
  addLoading: () => () => void;
  useAddLoading: (maxTimeout?: number) => {
    add: () => void;
    remove: (timeout?: number) => void;
  };
}>;

export const PREFERENCE = Symbol() as InjectionKey<{
  currency: Ref<string>;
  preferences: ComputedRef<Preferences | undefined>;
  activeCryptoCode: ComputedRef<String>;
  orderedCryptoCodes: Ref<String[]>;
}>;

export const WALLET = Symbol() as InjectionKey<{
  currentWallet: ComputedRef<Wallet | undefined>;
  whitelist: ComputedRef<Whitelist[] | []>;
  selectedAddress: Ref<string>;
  vaults: ComputedRef<Vault[] | []>;
  fee: Ref<number>;
}>;
