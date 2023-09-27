import {
  gameShowsIcon,
  liveCasinoIcon,
  newReleasesIcon,
  originalsIcon,
  slotsIcon,
  tableGamesIcon,
  currencyNoneIcon,
  currencyUSDIcon,
  currencyEURIcon,
  currencyINRIcon,
  currencyRUBIcon,
  currencyKRWIcon,
  currencyPHPIcon,
  currencyMXNIcon,
  currencyBRLIcon,
  currencyCADIcon,
  currencyCNYIcon,
  currencyDKKIcon,
  currencyIDRIcon,
  currencyJPYIcon,
  btcIcon,
  ethIcon,
  SolIcon,
  ltcIcon,
  usdtIcon,
  usdcIcon,
  xrpIcon,
  bnbIcon,
  busdIcon,
  trxIcon,
  dogeIcon,
  shibIcon,
  MaticIcon,
  dotIcon,
  adaIcon,
  daiIcon,
  diceIcon,
  limboIcon,
  minesIcon,
} from "~/icons";

export const categorySlugToIconMap: {
  [key in string]: string;
} = {
  originals: originalsIcon,
  slots: slotsIcon,
  "live-casino": liveCasinoIcon,
  "game-shows": gameShowsIcon,
  "table-games": tableGamesIcon,
  "new-releases": newReleasesIcon,
  roulette: gameShowsIcon,
  card: slotsIcon,
  casual: liveCasinoIcon,
  craps: gameShowsIcon,
  poker: tableGamesIcon,
  crash: newReleasesIcon,
  video_poker: gameShowsIcon,
  lottery: tableGamesIcon,
  gamba: newReleasesIcon,
};
export type currencyItem = {
  [key: string]: {
    icon: string;
    label: string;
    value: string;
    text: string;
  };
};

export const currencyItems: currencyItem = {
  USD: {
    icon: currencyUSDIcon,
    value: "USD",
    label: "USD",
    text: "$",
  },
  EUR: {
    icon: currencyEURIcon,
    value: "EUR",
    label: "EUR",
    text: "€",
  },
  CNY: {
    icon: currencyCNYIcon,
    value: "CNY",
    label: "CNY",
    text: "CN¥",
  },
  JPY: {
    icon: currencyJPYIcon,
    value: "JPY",
    label: "JPY",
    text: "¥",
  },
  CAD: {
    icon: currencyCADIcon,
    value: "CAD",
    label: "CAD",
    text: "CA$",
  },
  INR: {
    icon: currencyINRIcon,
    value: "INR",
    label: "INR",
    text: "₹",
  },
  BRL: {
    icon: currencyBRLIcon,
    value: "BRL",
    label: "BRL",
    text: "R$",
  },
  RUB: {
    icon: currencyRUBIcon,
    value: "RUB",
    label: "RUB",
    text: "₽",
  },
  IDR: {
    icon: currencyIDRIcon,
    value: "IDR",
    label: "IDR",
    text: "Rp",
  },
  MXN: {
    icon: currencyMXNIcon,
    value: "MXN",
    label: "MXN",
    text: "MX$",
  },
  KRW: {
    icon: currencyKRWIcon,
    value: "KRW",
    label: "KRW",
    text: "₩",
  },
  PHP: {
    icon: currencyPHPIcon,
    value: "PHP",
    label: "PHP",
    text: "₱",
  },
  DKK: {
    icon: currencyDKKIcon,
    value: "DKK",
    label: "DKK",
    text: "kr",
  },
};
interface CryptoCurrency {
  [key: string]: {
    icon?: string;
    confirms: number;
  };
}

interface GameIcon {
  [key: string]: {
    icon?: string;
  };
}

export const gameIcons: GameIcon = {
  Dice: {
    icon: diceIcon,
  },
  Limbo: {
    icon: limboIcon,
  },
  Mines: {
    icon: minesIcon,
  },
};
export const cryptoCurrencies: CryptoCurrency = {
  BTC: {
    icon: btcIcon,
    confirms: 1,
  },
  ETH: {
    icon: ethIcon,
    confirms: 6,
  },
  SOL: {
    confirms: 2,
  },
  LTC: {
    icon: ltcIcon,
    confirms: 1,
  },
  USDT: {
    icon: usdtIcon,
    confirms: 6,
  },
  USDC: {
    icon: usdcIcon,
    confirms: 6,
  },
  XRP: {
    icon: xrpIcon,
    confirms: 1,
  },
  BNB: {
    icon: bnbIcon,
    confirms: 2,
  },
  BUSD: {
    icon: busdIcon,
    confirms: 2,
  },
  TRX: {
    icon: trxIcon,
    confirms: 1,
  },
  DOGE: {
    icon: dogeIcon,
    confirms: 1,
  },
  SHIB: {
    icon: shibIcon,
    confirms: 6,
  },
  MATIC: {
    confirms: 2,
  },
  DOT: {
    icon: dotIcon,
    confirms: 2,
  },
  ADA: {
    icon: adaIcon,
    confirms: 2,
  },
  DAI: {
    icon: daiIcon,
    confirms: 6,
  },
};
