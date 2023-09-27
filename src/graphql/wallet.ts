import gql from "graphql-tag";

export const WALLET_UPDATED_SUBSCRIPTION = gql`
  subscription walletUpdated {
    walletUpdated {
      id
      free_amount
      __typename
    }
  }
`;

export const CURRENCIES_UPDATED_SUBSCRIPTION = gql`
  subscription currenciesUpdated {
    currenciesUpdated
  }
`;

export const GET_WALLET_ADDRESS_MUTATION = gql`
  mutation wallet($types: String!, $userId: String!) {
    wallet(input: { types: $types, userId: $userId }) {
      address
    }
  }
`;
export const WITHDRAW_MUTATION = gql`
  mutation withdraw(
    $walletId: Int!
    $userId: Int!
    $amount: Float!
    $currencyCode: String!
    $withdrawType: String!
    $destination: String!
    $code: String
  ) {
    withdraw(
      input: {
        walletId: $walletId
        userId: $userId
        amount: $amount
        currencyCode: $currencyCode
        withdrawType: $withdrawType
        destination: $destination
        code: $code
      }
    ) {
      title
      description
      walletAddress
      withdrawId
    }
  }
`;

export const DEPOSIT_TO_VAULT_MUTATION = gql`
  mutation depositToVault($userId: Int!, $currency: String!, $amount: Float!) {
    depositToVault(
      input: { userId: $userId, currency: $currency, amount: $amount }
    ) {
      description
      title
    }
  }
`;

export const WITHDRAW_FROM_VAULT_MUTATION = gql`
  mutation withdrawFromVault(
    $userId: Int!
    $currency: String!
    $amount: Float!
    $code: String!
  ) {
    withdrawFromVault(
      input: {
        userId: $userId
        currency: $currency
        amount: $amount
        code: $code
      }
    ) {
      description
      title
    }
  }
`;

export const TIPS_MUTATION = gql`
  mutation tips(
    $username: String!
    $userId: Int!
    $currency: String!
    $amount: Float!
    $code: String!
  ) {
    tips(
      input: {
        username: $username
        userId: $userId
        currency: $currency
        amount: $amount
        code: $code
      }
    ) {
      title
      description
    }
  }
`;

export const GET_FEE_MUTATION = gql`
  mutation getFee($currency: String!) {
    getFee(input: { currency: $currency }) {
      fee
    }
  }
`;

export const EMAIL_TWO_FA_MUTATION = gql`
  mutation emailTwoFa($action: String!, $userId: Int!) {
    emailTwoFa(input: { action: $action, userId: $userId }) {
      code
      description
      title
    }
  }
`;

export const TIPS_USERNAME_MUTATION = gql`
  mutation tipsUsername($q: String!) {
    tipsUsername(input: { q: $q }) {
      id
      username
    }
  }
`;
