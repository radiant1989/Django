import gql from "graphql-tag";

export const GAME_INIT_DICE = gql`
  mutation gameinitdice($game_identifier: String!, $currency_code: String!) {
    gameInitDice(
      game_identifier: $game_identifier
      currency_code: $currency_code
    ) {
      id
      session_key
      user {
        id
        username
      }
    }
  }
`;

export const BET_DICE = gql`
  mutation betdice(
    $bet_amount: Float!
    $client_seed: String!
    $condition: String!
    $count: Int!
    $currency: String!
    $cursor: Float!
    $nonce: Int!
    $server_seed: String!
    $session_key: String!
    $target: Float!
    $wallet_id: Int!
  ) {
    betDice(
      bet_amount: $bet_amount
      client_seed: $client_seed
      condition: $condition
      count: $count
      currency: $currency
      cursor: $cursor
      nonce: $nonce
      server_seed: $server_seed
      session_key: $session_key
      target: $target
      wallet_id: $wallet_id
    ) {
      balance
      state {
        condition
        result
        target
      }
      win
    }
  }
`;
