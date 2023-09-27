import {
  casinoIcon,
  favoritesIcon,
  recentsIcon,
  originalsIcon,
  slotsIcon,
  newReleasesIcon,
  liveCasinoIcon,
  gameShowsIcon,
  tableGamesIcon,
  rouletteIcon,
  blackjackIcon,
  friendsIcon,
  profileMenuIcon,
  pointsShopIcon,
  communitymenuIcon,
  sportIcon,
  vipmenuIcon,
  homeIcon,
  dashboardIcon,
  popupIcon,
  promotionsIcon,
  lotteryIcon,
  challengesIcon,
  affiliateRaceIcon,
  allGamesIcon,
  sportsIcon,
} from "~/icons";
import { GameCategory, GameProvider } from "~/types";
export interface SysNotificationData {
  title: string;
  time: string;
  receiver: string;
  content: string;
}
export interface WalletNotificationData {
  title: string;
  time: string;
  receiver: string;
  receiverImage: string;
  txType: string;
  tokenSrc: string;
  tokenAmount: number;
  usdAmount: number;
}
export interface Chat {
  profileImage: string;
  sender: string;
  time: string;
  content: string;
}
export interface Betslip {
  discipline: string;
  match: string;
  details: string;
  coefficient: number;
}
export interface Betslipdata {
  title: string;
  betslips: Betslip[];
  totalOdds: number;
  totalStake: number;
  payout: number;
}
export const WHITELIST_ADDRESSES = [
  {
    name: "Testing1",
    address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    flag: true,
  },
  {
    name: "Testing1",
    address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    flag: false,
  },
  {
    name: "Testing1",
    address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    flag: true,
  },
  {
    name: "Testing1",
    address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    flag: false,
  },
  {
    name: "Testing1",
    address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    flag: true,
  },
];

export const TEST_TABLE_DATA = [
  {
    id: 1,
    coin: "USDC(erc20)",
    name: "Testing 1",
    address: "0x69a91Bfb0E44C1DD153f71FF75A359E8f70f9060",
    flag: true,
  },
  {
    id: 2,
    coin: "BTC",
    name: "Testing 1",
    address: "0x69a91Bfb0E44C1DD153f71FF75A359E8f70f9060",
    flag: false,
  },
  {
    id: 3,
    coin: "SOL",
    name: "Testing 1",
    address: "0x69a91Bfb0E44C1DD153f71FF75A359E8f70f9060",
    flag: true,
  },
  {
    id: 4,
    coin: "USDC(TRC)",
    name: "Testing 1",
    address: "0x69a91Bfb0E44C1DD153f71FF75A359E8f70f9060",
    flag: false,
  },
];
export const TEST_TRANSACTIONS_DATA = [
  {
    id: 1,
    time: "08/25/2022 15:12:32",
    amount: 315.0,
    symbol:
      "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/eth.png",
    state: "Successful",
    type: 0,
    flag: true,
  },
  {
    id: 2,
    time: "08/25/2022 15:12:32",
    amount: 315.0,
    symbol:
      "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/sol.png",
    state: "Successful",
    type: 1,
    flag: false,
  },
  {
    id: 3,
    time: "08/25/2022 15:12:32",
    amount: 315.0,
    symbol:
      "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/ltc.png",
    state: "Successful",
    type: 0,
    flag: true,
  },
  {
    id: 4,
    time: "08/25/2022 15:12:32",
    amount: 315.0,
    symbol:
      "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/usdt.png",
    state: "Successful",
    type: 1,
    flag: false,
  },
  {
    id: 5,
    time: "08/25/2022 15:12:32",
    amount: 315.0,
    symbol:
      "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/btc.png",
    state: "Successful",
    type: 0,
    flag: true,
  },
  {
    id: 6,
    time: "08/25/2022 15:12:32",
    amount: 315.0,
    symbol:
      "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/btc.png",
    state: "Successful",
    type: 1,
    flag: false,
  },
];

export const TEST_OTHER_TRANSACTIONS_DATA = [
  {
    id: 1,
    time: "08/25/2022 15:12:32",
    amount: 315.0,
    symbol:
      "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/eth.png",
    balance: 1598,
    type: 0,
    flag: true,
  },
  {
    id: 2,
    time: "08/25/2022 15:12:32",
    amount: 315.0,
    symbol:
      "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/sol.png",
    balance: 1598,
    type: 1,
    flag: false,
  },
  {
    id: 3,
    time: "08/25/2022 15:12:32",
    amount: 315.0,
    symbol:
      "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/ltc.png",
    balance: 1598,
    type: 0,
    flag: true,
  },
  {
    id: 4,
    time: "08/25/2022 15:12:32",
    amount: 315.0,
    symbol:
      "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/usdt.png",
    balance: 1598,
    type: 1,
    flag: false,
  },
  {
    id: 5,
    time: "08/25/2022 15:12:32",
    amount: 315.0,
    symbol:
      "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/btc.png",
    balance: 1598,
    type: 0,
    flag: true,
  },
  {
    id: 6,
    time: "08/25/2022 15:12:32",
    amount: 315.0,
    symbol:
      "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/btc.png",
    balance: 1598,
    type: 1,
    flag: false,
  },
];

export const TEST_REFERRAL_CODES_TABLE_DATA = [
  {
    id: 1,
    code: "123edgest",
    refs: 0,
    wagered: "$0.00",
    backToUsers: 50,
  },
  {
    id: 2,
    code: "123edgest",
    refs: 0,
    wagered: "$0.00",
    backToUsers: 50,
  },
  {
    id: 3,
    code: "123edgest",
    refs: 0,
    wagered: "$0.00",
    backToUsers: 50,
  },
  {
    id: 4,
    code: "123edgest",
    refs: 0,
    wagered: "$0.00",
    backToUsers: 50,
  },
  {
    id: 5,
    code: "123edgest",
    refs: 0,
    wagered: "$0.00",
    backToUsers: 50,
  },
];

export const TEST_RADIO_LIST = ["ERC20", "TRC"];

export const TEST_TOKEN_LIST = [
  {
    src: "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/all.png",
    name: "All",
  },
  {
    src: "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/usdt.png",
    name: "USDT",
  },
  {
    src: "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/btc.png",
    name: "BTC",
  },
  {
    src: "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/eth.png",
    name: "ETH",
  },
  {
    src: "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/sol.png",
    name: "SOL",
  },
  {
    src: "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/ltc.png",
    name: "LTC",
  },
  {
    src: "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/usdt.png",
    name: "USDT",
  },
  {
    src: "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/btc.png",
    name: "BTC",
  },
  {
    src: "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/eth.png",
    name: "ETH",
  },
  {
    src: "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/sol.png",
    name: "SOL",
  },
  {
    src: "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/ltc.png",
    name: "LTC",
  },
];

export const TEST_TX_TYPE_LIST = [
  "All",
  "Game",
  "Bonus",
  "Affiliate",
  "Vault",
  "Tips",
  "Rakeback",
];
interface Route {
  name: string;
  path: string;
  image: string;
}

export const TEST_SYS_NOTIFICATION_DATA: SysNotificationData[] = [
  {
    title: "New Currency added!",
    time: "08/20/2022 12:23:12 AM",
    receiver: "John D",
    content:
      "Bet on your favorite teams, players, and events on our sports betting platform with a click of a button. A Safe and secure betting experience with all of your favorite sports in one place. Bet with new cryptocurrency!",
  },
  {
    title: "New Currency added!",
    time: "08/20/2022 12:23:12 AM",
    receiver: "John D",
    content:
      "Bet on your favorite teams, players, and events on our sports betting platform with a click of a button. A Safe and secure betting experience with all of your favorite sports in one place. Bet with new cryptocurrency!",
  },
  {
    title: "New Currency added!",
    time: "08/20/2022 12:23:12 AM",
    receiver: "John D",
    content:
      "Bet on your favorite teams, players, and events on our sports betting platform with a click of a button. A Safe and secure betting experience with all of your favorite sports in one place. Bet with new cryptocurrency!",
  },
  {
    title: "New Currency added!",
    time: "08/20/2022 12:23:12 AM",
    receiver: "John D",
    content:
      "Bet on your favorite teams, players, and events on our sports betting platform with a click of a button. A Safe and secure betting experience with all of your favorite sports in one place. Bet with new cryptocurrency!",
  },
  {
    title: "New Currency added!",
    time: "08/20/2022 12:23:12 AM",
    receiver: "John D",
    content:
      "Bet on your favorite teams, players, and events on our sports betting platform with a click of a button. A Safe and secure betting experience with all of your favorite sports in one place. Bet with new cryptocurrency!",
  },
  {
    title: "New Currency added!",
    time: "08/20/2022 12:23:12 AM",
    receiver: "John D",
    content:
      "Bet on your favorite teams, players, and events on our sports betting platform with a click of a button. A Safe and secure betting experience with all of your favorite sports in one place. Bet with new cryptocurrency!",
  },
  {
    title: "New Currency added!",
    time: "08/20/2022 12:23:12 AM",
    receiver: "John D",
    content:
      "Bet on your favorite teams, players, and events on our sports betting platform with a click of a button. A Safe and secure betting experience with all of your favorite sports in one place. Bet with new cryptocurrency!",
  },
  {
    title: "New Currency added!",
    time: "08/20/2022 12:23:12 AM",
    receiver: "John D",
    content:
      "Bet on your favorite teams, players, and events on our sports betting platform with a click of a button. A Safe and secure betting experience with all of your favorite sports in one place. Bet with new cryptocurrency!",
  },
];
export const TEST_WALLET_NOTIFICATION_DATA: WalletNotificationData[] = [
  {
    title: "Received a Tip!",
    time: "08/20/2022 12:23:12 AM",
    receiver: "SamSammy",
    receiverImage:
      "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Header/profile.jpg",
    txType: "Received",
    tokenSrc:
      "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/eth.png",
    tokenAmount: 0.032,
    usdAmount: 4.24,
  },
  {
    title: "Received a Tip!",
    time: "08/20/2022 12:23:12 AM",
    receiver: "SamSammy",
    receiverImage:
      "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Header/profile.jpg",
    txType: "Received",
    tokenSrc:
      "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/eth.png",
    tokenAmount: 0.032,
    usdAmount: 4.24,
  },
  {
    title: "Received a Tip!",
    time: "08/20/2022 12:23:12 AM",
    receiver: "SamSammy",
    receiverImage:
      "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Header/profile.jpg",
    txType: "Received",
    tokenSrc:
      "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/eth.png",
    tokenAmount: 0.032,
    usdAmount: 4.24,
  },
  {
    title: "Received a Tip!",
    time: "08/20/2022 12:23:12 AM",
    receiver: "SamSammy",
    receiverImage:
      "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Header/profile.jpg",
    txType: "Received",
    tokenSrc:
      "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/eth.png",
    tokenAmount: 0.032,
    usdAmount: 4.24,
  },
  {
    title: "Received a Tip!",
    time: "08/20/2022 12:23:12 AM",
    receiver: "SamSammy",
    receiverImage:
      "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Header/profile.jpg",
    txType: "Received",
    tokenSrc:
      "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/eth.png",
    tokenAmount: 0.032,
    usdAmount: 4.24,
  },
  {
    title: "Received a Tip!",
    time: "08/20/2022 12:23:12 AM",
    receiver: "SamSammy",
    receiverImage:
      "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Header/profile.jpg",
    txType: "Received",
    tokenSrc:
      "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/eth.png",
    tokenAmount: 0.032,
    usdAmount: 4.24,
  },
  {
    title: "Received a Tip!",
    time: "08/20/2022 12:23:12 AM",
    receiver: "SamSammy",
    receiverImage:
      "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Header/profile.jpg",
    txType: "Received",
    tokenSrc:
      "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/eth.png",
    tokenAmount: 0.032,
    usdAmount: 4.24,
  },
  {
    title: "Received a Tip!",
    time: "08/20/2022 12:23:12 AM",
    receiver: "SamSammy",
    receiverImage:
      "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Header/profile.jpg",
    txType: "Received",
    tokenSrc:
      "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/eth.png",
    tokenAmount: 0.032,
    usdAmount: 4.24,
  },
  {
    title: "Received a Tip!",
    time: "08/20/2022 12:23:12 AM",
    receiver: "SamSammy",
    receiverImage:
      "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Header/profile.jpg",
    txType: "Received",
    tokenSrc:
      "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/eth.png",
    tokenAmount: 0.032,
    usdAmount: 4.24,
  },
  {
    title: "Received a Tip!",
    time: "08/20/2022 12:23:12 AM",
    receiver: "SamSammy",
    receiverImage:
      "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Header/profile.jpg",
    txType: "Received",
    tokenSrc:
      "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/eth.png",
    tokenAmount: 0.032,
    usdAmount: 4.24,
  },
];
export const TEST_CHATDATA: Chat[] = [
  {
    profileImage:
      "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Header/profile.jpg",
    sender: "Johny D",
    content:
      "Thanks mate! Wasn’t expecting that, to be honest. Gambling is new for me yet, but I hope we’ll stay here forever and can make our lives easier and more interesting at least a bit lol",
    time: "12:24",
  },
  {
    profileImage:
      "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Header/profile.jpg",
    sender: "Johny D",
    content: "Gratz bro @AlexTheBeast",
    time: "12:24",
  },
  {
    profileImage:
      "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Header/profile.jpg",
    sender: "Johny D",
    content:
      "Damn! Cool news @AlexTheBeast LFG! I hope I’ll be right on time :D",
    time: "12:24",
  },
  {
    profileImage:
      "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Header/profile.jpg",
    sender: "Johny D",
    content:
      "Thanks mate! Wasn’t expecting that, to be honest. Gambling is new for me yet, but I hope we’ll stay here forever and can make our lives easier and more interesting at least a bit lol",
    time: "12:24",
  },
  {
    profileImage:
      "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Header/profile.jpg",
    sender: "Johny D",
    content:
      "Thanks mate! Wasn’t expecting that, to be honest. Gambling is new for me yet, but I hope we’ll stay here forever and can make our lives easier and more interesting at least a bit lol",
    time: "12:24",
  },
  {
    profileImage:
      "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Header/profile.jpg",
    sender: "Johny D",
    content:
      "Thanks mate! Wasn’t expecting that, to be honest. Gambling is new for me yet, but I hope we’ll stay here forever and can make our lives easier and more interesting at least a bit lol",
    time: "12:24",
  },
  {
    profileImage:
      "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Header/profile.jpg",
    sender: "Johny D",
    content:
      "Thanks mate! Wasn’t expecting that, to be honest. Gambling is new for me yet, but I hope we’ll stay here forever and can make our lives easier and more interesting at least a bit lol",
    time: "12:24",
  },
  {
    profileImage:
      "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Header/profile.jpg",
    sender: "Johny D",
    content:
      "Thanks mate! Wasn’t expecting that, to be honest. Gambling is new for me yet, but I hope we’ll stay here forever and can make our lives easier and more interesting at least a bit lol",
    time: "12:24",
  },
  {
    profileImage:
      "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Header/profile.jpg",
    sender: "Johny D",
    content:
      "Thanks mate! Wasn’t expecting that, to be honest. Gambling is new for me yet, but I hope we’ll stay here forever and can make our lives easier and more interesting at least a bit lol",
    time: "12:24",
  },
  {
    profileImage:
      "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Header/profile.jpg",
    sender: "Johny D",
    content:
      "Thanks mate! Wasn’t expecting that, to be honest. Gambling is new for me yet, but I hope we’ll stay here forever and can make our lives easier and more interesting at least a bit lol",
    time: "12:24",
  },
  {
    profileImage:
      "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Header/profile.jpg",
    sender: "Johny D",
    content: "Gratz bro @AlexTheBeast",
    time: "12:24",
  },
  {
    profileImage:
      "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Header/profile.jpg",
    sender: "Johny D",
    content:
      "Damn! Cool news @AlexTheBeast LFG! I hope I’ll be right on time :D",
    time: "12:24",
  },
  {
    profileImage:
      "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Header/profile.jpg",
    sender: "Johny D",
    content:
      "Thanks mate! Wasn’t expecting that, to be honest. Gambling is new for me yet, but I hope we’ll stay here forever and can make our lives easier and more interesting at least a bit lol",
    time: "12:24",
  },
  {
    profileImage:
      "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Header/profile.jpg",
    sender: "Johny D",
    content:
      "Thanks mate! Wasn’t expecting that, to be honest. Gambling is new for me yet, but I hope we’ll stay here forever and can make our lives easier and more interesting at least a bit lol",
    time: "12:24",
  },
  {
    profileImage:
      "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Header/profile.jpg",
    sender: "Johny D",
    content:
      "Thanks mate! Wasn’t expecting that, to be honest. Gambling is new for me yet, but I hope we’ll stay here forever and can make our lives easier and more interesting at least a bit lol",
    time: "12:24",
  },
  {
    profileImage:
      "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Header/profile.jpg",
    sender: "Johny D",
    content:
      "Thanks mate! Wasn’t expecting that, to be honest. Gambling is new for me yet, but I hope we’ll stay here forever and can make our lives easier and more interesting at least a bit lol",
    time: "12:24",
  },
  {
    profileImage:
      "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Header/profile.jpg",
    sender: "Johny D",
    content:
      "Thanks mate! Wasn’t expecting that, to be honest. Gambling is new for me yet, but I hope we’ll stay here forever and can make our lives easier and more interesting at least a bit lol",
    time: "12:24",
  },
  {
    profileImage:
      "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Header/profile.jpg",
    sender: "Johny D",
    content:
      "Thanks mate! Wasn’t expecting that, to be honest. Gambling is new for me yet, but I hope we’ll stay here forever and can make our lives easier and more interesting at least a bit lol",
    time: "12:24",
  },
];

export const TAGGING_LIST = ["@Gamba Official", "AlexTheBeast"];

export const TEST_BETSLIP_DATA: Betslipdata[] = [
  {
    title: "Ordinar",
    betslips: [
      {
        discipline: "CS:GO",
        match: "Lan Championship Semi-Final",
        details: "1st map - Total over + Win",
        coefficient: 1.6,
      },
    ],
    totalOdds: 4532,
    totalStake: 5674.32,
    payout: 156.78,
  },
  {
    title: "Express",
    betslips: [
      {
        discipline: "CS:GO",
        match: "Lan Championship Semi-Final",
        details: "1st map - Total over + Win",
        coefficient: 2.3,
      },
      {
        discipline: "CS:GO",
        match: "Lan Championship Semi-Final",
        details: "2st map - Total over + Win",
        coefficient: 2.3,
      },
    ],
    totalOdds: 4532,
    totalStake: 5674.32,
    payout: 156.78,
  },
  {
    title: "Ordinar",
    betslips: [
      {
        discipline: "CS:GO",
        match: "Lan Championship Semi-Final",
        details: "1st map - Total over + Win",
        coefficient: 1.6,
      },
    ],
    totalOdds: 4532,
    totalStake: 5674.32,
    payout: 156.78,
  },
  {
    title: "Ordinar",
    betslips: [
      {
        discipline: "CS:GO",
        match: "Lan Championship Semi-Final",
        details: "1st map - Total over + Win",
        coefficient: 2.3,
      },
      {
        discipline: "CS:GO",
        match: "Lan Championship Semi-Final",
        details: "2st map - Total over + Win",
        coefficient: 2.3,
      },
    ],
    totalOdds: 4532,
    totalStake: 5674.32,
    payout: 156.78,
  },
];

export const LANGUAGE_LIST = [
  "English",
  "Chinese",
  "Spanish",
  "Hindi",
  "Arabic",
  "Portuguese",
  "Russian",
  "Indonesian",
  "French",
  "Japanese",
  "Turkish",
  "Korean",
  "Polish",
  "Finnish",
];

export const RULE_LIST = [
  "Be respectful to others in the chat. Do not harass, insult, or use offensive language towards other users or staff members.",
  "Avoid spamming or using excessive capital letters when chatting.",
  "Do not beg or solicit loans, rains, tips, or any other form of cryptocurrency from other users.",
  "Do not engage in suspicious behavior that could be perceived as scamming. This includes offering or asking for investment opportunities, using alternative accounts, or attempting to exploit bugs or glitches in the platform.",
  "Do not advertise, trade, sell, or buy any goods or services in the chat. This includes sharing links to external websites or social media accounts.",
  "Do not share personal information or ask for personal information from other users. This includes social media accounts, email addresses, phone numbers, or other identifying information.",
  "Do not use URL shorteners or share shortened links in the chat. Always use the full link to ensure transparency and safety.",
  "Respect the language of the chat room and only use the designated language accordingly.",
  "Do not discuss politics, religion, or any other sensitive topics in the chat.",
  "Do not share or advertise referral codes in the chat.",
  "Follow the instructions of the moderators and staff members. Failure to comply with their requests may result in action against your chat privileges.",
];

export const DEFAULT_CHAT_TEXT_LIMIT_LENGTH = 160;

export const CURRENCY_LIST = [
  {
    src: "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/usdt.png",
    name: "USDT",
    balance: 0.000005,
  },
  {
    src: "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/btc.png",
    name: "BTC",
    balance: 0.000005,
  },
  {
    src: "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/eth.png",
    name: "ETH",
    balance: 0.000005,
  },
  {
    src: "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/sol.png",
    name: "SOL",
    balance: 0.000005,
  },
  {
    src: "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/ltc.png",
    name: "LTC",
    balance: 0.000005,
  },
  {
    src: "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/usdt.png",
    name: "USDT",
    balance: 0.000005,
  },
  {
    src: "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/btc.png",
    name: "BTC",
    balance: 0.000005,
  },
  {
    src: "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/eth.png",
    name: "ETH",
    balance: 0.000005,
  },
  {
    src: "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/sol.png",
    name: "SOL",
    balance: 0.000005,
  },
  {
    src: "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/ltc.png",
    name: "LTC",
    balance: 0.000005,
  },
];

export const ROUTES = [
  {
    type: "group",
    label: "Casino",
    key: "casino",
    url: "/casino/home",
    icon: allGamesIcon,
    items: [
      {
        type: "link",
        key: "favorites",
        label: "Favorites",
        url: "/casino/favorites",
        icon: favoritesIcon,
        state: "disabled",
      },
      {
        type: "link",
        key: "recents",
        label: "Recents",
        url: "/casino/recents",
        icon: recentsIcon,
        state: "disabled",
      },
      {
        type: "divider",
      },
      {
        type: "link",
        key: "originals",
        label: "Originals",
        url: "/casino/originals",
        icon: originalsIcon,
        state: "disabled",
      },
      {
        type: "link",
        key: "slots",
        label: "Slots",
        url: "/casino/slots",
        icon: slotsIcon,
        state: "disabled",
      },
      {
        type: "link",
        key: "newReleases",
        label: "New Releases",
        url: "/casino/new-releases",
        icon: newReleasesIcon,
        state: "disabled",
      },
      {
        type: "link",
        key: "liveCasino",
        label: "Live Casino",
        url: "/casino/live-casino",
        icon: liveCasinoIcon,
        state: "disabled",
      },
      {
        type: "link",
        key: "gameShows",
        label: "Game Shows",
        url: "/casino/game-shows",
        icon: gameShowsIcon,
        state: "disabled",
      },
      {
        type: "link",
        key: "tableGames",
        label: "Table Games",
        url: "/casino/table-games",
        icon: tableGamesIcon,
        state: "disabled",
      },
      {
        type: "link",
        key: "roulette",
        label: "Roulette",
        url: "/casino/roulette",
        icon: rouletteIcon,
        state: "disabled",
      },
      {
        type: "link",
        key: "blackjack",
        label: "Blackjack",
        url: "/casino/blackjack",
        icon: blackjackIcon,
        state: "disabled",
      },
    ],
  },
  {
    type: "group",
    label: "Sports",
    key: "sports",
    url: "/sports/home",
    icon: sportsIcon,
    items: [
      {
        type: "link",
        key: "favorites",
        label: "Test1",
        url: "/sports/test1",
        icon: favoritesIcon,
        state: "disabled",
      },
      {
        type: "link",
        key: "recents",
        label: "Test2",
        url: "/sports/test2",
        icon: recentsIcon,
        state: "disabled",
      },
    ],
  },
  {
    type: "group",
    label: "Community",
    key: "community",
    url: "/community",
    icon: communitymenuIcon,
    items: [
      {
        type: "link",
        key: "friends",
        label: "Friends",
        url: "/community/friends",
        icon: friendsIcon,
        state: "disabled",
      },
      {
        type: "link",
        key: "profile",
        label: "Profile",
        url: "/community/profile",
        icon: profileMenuIcon,
        state: "disabled",
      },
      {
        type: "link",
        key: "pointsShop",
        label: "Points Shop",
        url: "/community/points-shop",
        icon: pointsShopIcon,
        state: "disabled",
      },
    ],
  },
  {
    type: "group",
    label: "VIP Program",
    key: "vip-program",
    url: "/vip-program",
    icon: vipmenuIcon,
    items: [
      {
        type: "link",
        key: "vip-home",
        label: "Home",
        url: "/vip-program/home",
        icon: homeIcon,
        state: "disabled",
      },
      {
        type: "link",
        key: "dashboard",
        label: "Dashboard",
        url: "/vip-program/dashboard",
        icon: dashboardIcon,
        state: "disabled",
      },
      {
        type: "link",
        key: "pop-up",
        label: "Pop-up",
        url: "/vip-program/pop-up",
        icon: popupIcon,
        state: "disabled",
      },
    ],
  },
  {
    type: "group",
    label: "Promotions",
    key: "promotions",
    url: "/promotions",
    icon: promotionsIcon,
    items: [
      {
        type: "link",
        key: "promotions-home",
        label: "Home",
        url: "/promotions/home",
        icon: homeIcon,
        state: "disabled",
      },
      {
        type: "link",
        key: "challenges",
        label: "Challenges",
        url: "/promotions/challenges",
        icon: challengesIcon,
        state: "disabled",
      },
      {
        type: "link",
        key: "lottery",
        label: "Lottery",
        url: "/promotions/lottery",
        icon: lotteryIcon,
        state: "disabled",
      },
      {
        type: "link",
        key: "affiliate-race",
        label: "Affiliate Race",
        url: "/promotions/affiliate-race",
        icon: affiliateRaceIcon,
        state: "disabled",
      },
    ],
  },
];

export const COMMISSION_TABLE_DATA = [
  {
    available: {
      balance: 0.000032,
      src: "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/usdt.png",
    },
    commission: {
      balance: 0.000032,
      src: "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/usdt.png",
    },
    withdrawn: {
      balance: 0.000032,
      src: "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/usdt.png",
    },
  },
  {
    available: {
      balance: 0.000452,
      src: "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/sol.png",
    },
    commission: {
      balance: 0.000452,
      src: "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/sol.png",
    },
    withdrawn: {
      balance: 0.000452,
      src: "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/sol.png",
    },
  },
  {
    available: {
      balance: 0.000032,
      src: "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/ltc.png",
    },
    commission: {
      balance: 0.000032,
      src: "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/ltc.png",
    },
    withdrawn: {
      balance: 0.000032,
      src: "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/ltc.png",
    },
  },
  {
    available: {
      balance: 0.000032,
      src: "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/usdt.png",
    },
    commission: {
      balance: 0.000032,
      src: "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/usdt.png",
    },
    withdrawn: {
      balance: 0.000032,
      src: "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/usdt.png",
    },
  },
  {
    available: {
      balance: 0.000452,
      src: "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/sol.png",
    },
    commission: {
      balance: 0.000452,
      src: "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/sol.png",
    },
    withdrawn: {
      balance: 0.000452,
      src: "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/sol.png",
    },
  },
];

export const REFERRED_USERS_TABLE_DATA = [
  {
    referralCode: "123sdfwers",
    user: {
      src: "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Header/profile.jpg",
      name: "John123",
    },
    referredOn: "Aug 16 2022, 18:32",
    wagered: "12.00",
    commission: "0.00",
    backToUsers: 50,
  },
  {
    referralCode: "123sdfwers",
    user: {
      src: "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Header/profile.jpg",
      name: "John123",
    },
    referredOn: "Aug 16 2022, 18:32",
    wagered: "12.00",
    commission: "0.00",
    backToUsers: 50,
  },
  {
    referralCode: "123sdfwers",
    user: {
      src: "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Header/profile.jpg",
      name: "John123",
    },
    referredOn: "Aug 16 2022, 18:32",
    wagered: "12.00",
    commission: "0.00",
    backToUsers: 50,
  },
  {
    referralCode: "123sdfwers",
    user: {
      src: "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Header/profile.jpg",
      name: "John123",
    },
    referredOn: "Aug 16 2022, 18:32",
    wagered: "12.00",
    commission: "0.00",
    backToUsers: 50,
  },
  {
    referralCode: "123sdfwers",
    user: {
      src: "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Header/profile.jpg",
      name: "John123",
    },
    referredOn: "Aug 16 2022, 18:32",
    wagered: "12.00",
    commission: "0.00",
    backToUsers: 50,
  },
  {
    referralCode: "123sdfwers",
    user: {
      src: "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Header/profile.jpg",
      name: "John123",
    },
    referredOn: "Aug 16 2022, 18:32",
    wagered: "12.00",
    commission: "0.00",
    backToUsers: 50,
  },
  {
    referralCode: "123sdfwers",
    user: {
      src: "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Header/profile.jpg",
      name: "John123",
    },
    referredOn: "Aug 16 2022, 18:32",
    wagered: "12.00",
    commission: "0.00",
    backToUsers: 50,
  },
  {
    referralCode: "123sdfwers",
    user: {
      src: "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Header/profile.jpg",
      name: "John123",
    },
    referredOn: "Aug 16 2022, 18:32",
    wagered: "12.00",
    commission: "0.00",
    backToUsers: 50,
  },
];
export const WAGERED_DATA = [
  {
    currency: {
      src: "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/usdt.png",
      name: "USDT",
    },
    wagered: "0.0000000",
  },
  {
    currency: {
      src: "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/sol.png",
      name: "SOL",
    },
    wagered: "0.0000000",
  },
  {
    currency: {
      src: "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/eth.png",
      name: "ETH",
    },
    wagered: "0.0000000",
  },
  {
    currency: {
      src: "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/ltc.png",
      name: "LTC",
    },
    wagered: "0.0000000",
  },
  {
    currency: {
      src: "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/usdt.png",
      name: "USDT",
    },
    wagered: "0.0000000",
  },
  {
    currency: {
      src: "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/sol.png",
      name: "SOL",
    },
    wagered: "0.0000000",
  },
  {
    currency: {
      src: "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/eth.png",
      name: "ETH",
    },
    wagered: "0.0000000",
  },
  {
    currency: {
      src: "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/ltc.png",
      name: "LTC",
    },
    wagered: "0.0000000",
  },
  {
    currency: {
      src: "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/usdt.png",
      name: "USDT",
    },
    wagered: "0.0000000",
  },
  {
    currency: {
      src: "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/sol.png",
      name: "SOL",
    },
    wagered: "0.0000000",
  },
  {
    currency: {
      src: "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/eth.png",
      name: "ETH",
    },
    wagered: "0.0000000",
  },
  {
    currency: {
      src: "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/ltc.png",
      name: "LTC",
    },
    wagered: "0.0000000",
  },
  {
    currency: {
      src: "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/usdt.png",
      name: "USDT",
    },
    wagered: "0.0000000",
  },
  {
    currency: {
      src: "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/sol.png",
      name: "SOL",
    },
    wagered: "0.0000000",
  },
  {
    currency: {
      src: "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/eth.png",
      name: "ETH",
    },
    wagered: "0.0000000",
  },
  {
    currency: {
      src: "https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Wallet/ltc.png",
      name: "LTC",
    },
    wagered: "0.0000000",
  },
];
export const gameCategories: GameCategory[] = [
  {
    id: "1",
    name: "Originals",
    slug: "originals",
  },
  {
    id: "2",
    name: "Slots",
    slug: "slots",
  },
  {
    id: "3",
    name: "Live Casino",
    slug: "live-casino",
  },
  {
    id: "4",
    name: "Game Shows",
    slug: "game-shows",
  },
  {
    id: "5",
    name: "Table Games",
    slug: "table-games",
  },
  {
    id: "6",
    name: "New Releases",
    slug: "new-releases",
  },
];

export const gameProviders: GameProvider[] = [
  {
    id: "1",
    name: "Hacksaw Gaming",
    slug: "hacksaw-gaming",
    logo: {
      id: "1",
      url: "https://cdn.softswiss.net/logos/providers/color/softswiss.svg",
    },
  },
  {
    id: "2",
    name: "Pragmatic",
    slug: "pragmatic",
    logo: {
      id: "1",
      url: "https://media.graphassets.com/pk9puziDSz6E5w3nbvtW",
    },
  },
  {
    id: "3",
    name: "Evolution",
    slug: "evolution",
    logo: {
      id: "1",
      url: "https://cdn.softswiss.net/logos/providers/color/softswiss.svg",
    },
  },
  {
    id: "4",
    name: "Play N Go",
    slug: "play-go",
    logo: {
      id: "1",
      url: "https://cdn.softswiss.net/logos/providers/color/softswiss.svg",
    },
  },
  {
    id: "5",
    name: "Playtech",
    slug: "playtech",
    logo: {
      id: "1",
      url: "https://cdn.softswiss.net/logos/providers/color/softswiss.svg",
    },
  },
  {
    id: "6",
    name: "Bread Games",
    slug: "bread-games",
    logo: {
      id: "1",
      url: "https://cdn.softswiss.net/logos/providers/color/softswiss.svg",
    },
  },
];
