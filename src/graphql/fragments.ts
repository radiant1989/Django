import gql from "graphql-tag";

export const currencyFragment = gql`
  fragment currencyFields on Currency {
    id
    created_at
    active
    code
    current_price
    description
    last_price
    name
    logo
    subunits
    symbol
    price_updated_at
    quotes {
      values
    }
  }
`;

export const walletFragment = gql`
  fragment walletFields on Wallet {
    created_at
    free_amount
    locked_balance
    activeAddress {
      address
      id
      status
      wallet_id
    }
    currency {
      ...currencyFields
    }
    id
  }
  ${currencyFragment}
`;

export const whitelistFragment = gql`
  fragment whitelistFields on Whitelist {
    address
    address_name
    currency
  }
`;
export const vaultFragment = gql`
  fragment vaultFields on Vault {
    amount
    currency
  }
`;

export const gameFields = gql`
  fragment gameFields on Game {
    id
    title
    slug
    image
    enabled
  }
`;

export const gameDetailFields = gql`
  fragment gameDetailFields on Game {
    id
    identifier
    title
    image
  }
`;

export const userFields = gql`
  fragment userFields on User {
    id
    username
    email
    email_verified_at
    created_at
    updated_at
    enable2fa
    wallets {
      ...walletFields
    }
    vault {
      ...vaultFields
    }
    whitelist {
      ...whitelistFields
    }
    preferences
  }
  ${walletFragment}
  ${vaultFragment}
  ${whitelistFragment}
`;

export const gameCategoryFields = gql`
  fragment gameCategoryFields on GameCategory {
    id
    name
    slug
  }
`;
export const paginatorInfoFields = gql`
  fragment paginatorInfoFields on PaginatorInfo {
    count
    currentPage
    firstItem
    hasMorePages
    lastItem
    lastPage
    perPage
    total
  }
`;
