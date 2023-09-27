import gql from "graphql-tag";

export const GET_BALANCE_BY_CURRENCY_CODE = gql`
  query getBalanceByCurrencyCode($currencyCode: String!) {
    getBalanceByCurrencyCode(currencyCode: $currencyCode)
  }
`;

export interface BetGameInput {
  currencyCode: string;
  betAmount: number;
  identifier: string;
  parameters: string;
}

export interface BetGameResponse {
  balance: number;
  delta: number;
  matchId: string;
  partialResult: string;
  status: string;
  transactionId: string;
}

export const BET_GAME = gql`
  mutation betGame($input: BetGameInput!) {
    betGame(input: $input) {
      balance
      delta
      matchId
      partialResult
      status
      transactionId
    }
  }
`;

export interface BET_RESPONSE {
  action_id: string;
  amount: number;
  bet_conditions: object;
  bet_multiplier: number;
  client_seed: string;
  created_at: string;
  currency_code: string;
  cursor: number;
  display_name: string;
  final_results: number;
  game: string;
  match_id: string;
  multiplier: number;
  nonce: number;
  payout: number;
  processed_at: string;
  server_seed_hashed: string;
  server_seed_unhashed: string;
  transaction_id: string;
}

export const BET = gql`
  query bet($transaction_id: ID!) {
    bet(transaction_id: $transaction_id) {
      action_id
      amount
      bet_conditions
      bet_multiplier
      created_at
      client_seed
      currency_code
      cursor
      display_name
      final_results
      game
      multiplier
      match_id
      nonce
      payout
      processed_at
      server_seed_hashed
      server_seed_unhashed
      transaction_id
    }
  }
`;

export const LIVE_BET = gql`
  subscription liveBet {
    liveBet {
      id
      __typename
      action_id
      amount
      # bet_conditions
      # client_seed
      # created_at
      currency_code
      # cursor
      display_name
      # final_results
      game
      # issued_at
      # match_id
      multiplier
      # nonce
      # normalized_amount
      # normalized_payout
      payout
      # processed_at
      # server_seed_hashed
      # server_seed_unhashed
      transaction_id
      user_id
      high_roller
      # updated_at
    }
  }
`;
export const BETS_BY_USRE_SUBSCRIPTION = gql`
  subscription betsByUser {
    betsByUser {
      id
      __typename
      action_id
      bet_conditions
      amount
      client_seed
      created_at
      currency_code
      cursor
      display_name
      final_results
      game
      high_roller
      issued_at
      match_id
      multiplier
      normalized_amount
      nonce
      normalized_payout
      payout
      processed_at
      server_seed_hashed
      server_seed_unhashed
      transaction_id
      updated_at
    }
  }
`;

export interface PlayGameInput {
  currencyCode: string;
  identifier: string;
  parameters: string;
}

export interface PlayGameResponse {
  balance: number;
  matchId: string;
  partialResult: string;
  delta: number;
  status: string;
  transactionId: string;
}

export const PLAYGAME = gql`
  mutation playGame($input: PlayGameInput!) {
    playGame(input: $input) {
      balance
      matchId
      partialResult
      delta
      status
      transactionId
    }
  }
`;

export interface BetMatchInput {
  betAmount: number;
  matchId: string;
  parameters: string;
}

export interface BetMatchResponse {
  balance: number;
  delta: number;
  matchId: string;
  partialResult: string;
  status: string;
  transactionId: string;
}

export const BETMATCH = gql`
  mutation betMatch($input: BetMatchInput!) {
    betMatch(input: $input) {
      balance
      delta
      matchId
      partialResult
      status
      transactionId
    }
  }
`;

export const BETS_BY_USER = gql`
  query betsByUser(
    $amount_end: Float
    $amount_start: Float
    $ends_at: DateTime
    $starts_at: DateTime
    $game_id: ID
    $limit: Int!
    $payout_start: Float
    $payout_end: Float
    $currency_code: String
    $exclusive_start_key: JSON
  ) {
    betsByUser(
      filter: {
        amount_end: $amount_end
        amount_start: $amount_start
        ends_at: $ends_at
        starts_at: $starts_at
        game_id: $game_id
        limit: $limit
        payout_start: $payout_start
        payout_end: $payout_end
        currency_code: $currency_code
        exclusive_start_key: $exclusive_start_key
      }
    ) {
      paginate {
        page_count
        exclusive_start_key
      }
      results {
        amount
        bet_conditions
        client_seed
        currency_code
        normalized_payout
        processed_at
        action_id
        created_at
        cursor
        display_name
        final_results
        game
        issued_at
        multiplier
        bet_multiplier
        nonce
        normalized_amount
        payout
        server_seed_hashed
        server_seed_unhashed
        transaction_id
        updated_at
      }
    }
  }
`;

export interface BETS_RESPONSE {
  amount: number;
  bet_conditions: string;
  client_seed: string;
  currency_code: string;
  normalized_payout: number;
  processed_at: string;
  action_id: string;
  created_at: string;
  cursor: number;
  display_name: string;
  final_results: string;
  game: string;
  issued_at: string;
  multiplier: number;
  bet_multiplier: number;
  nonce: number;
  normalized_amount: number;
  payout: number;
  server_seed_hashed: string;
  server_seed_unhashed: string;
  transaction_id: string;
  updated_at: string;
}

export const BETS = gql`
  query bets(
    $amount_end: Float
    $amount_start: Float
    $ends_at: DateTime
    $starts_at: DateTime
    $game_id: ID
    $limit: Int!
    $payout_start: Float
    $payout_end: Float
  ) {
    bets(
      filter: {
        amount_end: $amount_end
        amount_start: $amount_start
        ends_at: $ends_at
        starts_at: $starts_at
        game_id: $game_id
        limit: $limit
        payout_start: $payout_start
        payout_end: $payout_end
      }
    ) {
      paginate {
        page_count
      }
      results {
        amount
        bet_conditions
        client_seed
        currency_code
        normalized_payout
        processed_at
        action_id
        created_at
        cursor
        display_name
        final_results
        game
        issued_at
        multiplier
        bet_multiplier
        nonce
        normalized_amount
        payout
        server_seed_hashed
        server_seed_unhashed
        transaction_id
        updated_at
      }
    }
  }
`;

export interface BetsHighRollersResponse {
  amount: number;
  client_seed: string;
  currency_code: string;
  game: string;
  bet_conditions: object;
  created_at: string;
  display_name: string;
  cursor: number;
  final_results: number;
  multiplier: number;
  bet_multiplier: number;
  issued_at: string;
  nonce: number;
  normalized_amount: number;
  normalized_payout: number;
  payout: number;
  processed_at: string;
  server_seed_hashed: string;
  server_seed_unhashed: string;
  transaction_id: string;
  updated_at: string;
}

export const BETSHIGHROLLERS = gql`
  query betsHighRollers($limit: Int, $game_id: ID) {
    betsHighRollers(filter: { limit: $limit, game_id: $game_id }) {
      paginate {
        page_count
      }
      results {
        amount
        client_seed
        currency_code
        game
        bet_conditions
        created_at
        display_name
        cursor
        final_results
        multiplier
        bet_multiplier
        issued_at
        nonce
        normalized_amount
        normalized_payout
        payout
        processed_at
        server_seed_hashed
        server_seed_unhashed
        transaction_id
        updated_at
      }
    }
  }
`;

export interface CLIENT_SEED {
  binary_seed: string;
  client_seed: string;
  created_at: string;
  id: string;
  is_current: boolean;
  nonce: number;
  updated_at: string;
}
export interface SERVER_SEED {
  created_at: string;
  id: string;
  server_seed_hashed: string;
  updated_at: string;
}
export interface SEED_RESPONSE {
  clientSeed: CLIENT_SEED;
  serverSeed: SERVER_SEED;
  serverSeedUnhashed: string;
}

export const CREATE_NEW_PAIR = gql`
  mutation createNewPair($newClientSeed: String!, $gameId: Int!) {
    createNewPair(newClientSeed: $newClientSeed, gameId: $gameId) {
      clientSeed {
        binary_seed
        client_seed
        created_at
        id
        is_current
        nonce
        updated_at
      }
      serverSeed {
        created_at
        id
        server_seed_hashed
        updated_at
      }
      serverSeedUnhashed
    }
  }
`;
export interface CLIENT_SEED {
  binary_seed: string;
  client_seed: string;
  updated_at: string;
  nonce: number;
  is_current: boolean;
  id: string;
  created_at: string;
}
export interface SERVER_SEED {
  created_at: string;
  id: string;
  server_seed_hashed: string;
  updated_at: string;
}
export interface SEED_PAIR_RESPONSE {
  clientSeed: CLIENT_SEED;
  serverSeed: SERVER_SEED;
  serverSeedUnhashed: string;
}
export const GET_CURRENT_PAIR = gql`
  query getCurrentPair($game_id: ID) {
    getCurrentPair(gameId: $game_id) {
      clientSeed {
        binary_seed
        client_seed
        updated_at
        nonce
        is_current
        id
        created_at
      }
      serverSeed {
        created_at
        id
        server_seed_hashed
        updated_at
      }
      serverSeedUnhashed
    }
  }
`;
