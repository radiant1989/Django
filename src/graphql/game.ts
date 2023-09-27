import {
  gameCategoryFields,
  gameFields,
  gameDetailFields,
  paginatorInfoFields,
} from "./fragments";

export const GAME_QUERY = gql`
  query game($id: ID, $slug: String) {
    game(id: $id, slug: $slug) {
      ...gameDetailFields
      gameCategory {
        ...gameCategoryFields
      }
    }
  }
  ${gameDetailFields}
  ${gameCategoryFields}
`;

export const GAMES_QUERY = gql`
  query games($first: Int!, $page: Int) {
    games(first: $first, page: $page) {
      data {
        ...gameFields
      }
    }
  }
  ${gameFields}
`;
export const GAME_CATEGORIES_QUERY = gql`
  query gameCategories {
    gameCategories {
      ...gameCategoryFields
    }
  }
  ${gameCategoryFields}
`;
export const GAME_CATEGORY_QUERY = gql`
  query gameCategory($id: ID!) {
    gameCategory(id: $id) {
      ...gameCategoryFields
    }
  }
  ${gameCategoryFields}
`;

export const GAMES_BY_CATEGORY_QUERY = gql`
  query gamesByCategory(
    $game_category_id: ID!
    $first: Int!
    $page: Int
  ) {
    gamesByCategory(
      game_category_id: $game_category_id
      first: $first
      page: $page
    ) {
      paginatorInfo {
        ...paginatorInfoFields
      }
      data {
        ...gameFields
        gameProducer {
          id
          slug
        }
      }
    }
  }
  ${paginatorInfoFields}
  ${gameFields}
`;

export const START_DEMO_MUTATION = gql`
  mutation startDemo($game: String) {
    startDemo(game: $game) {
      game_url
      strategy
    }
  }
`;

export const START_GAME_MUTATION = gql`
  mutation startGame($game: String, $fiatCurrency: String, $cryptoCurrency: String) {
    startGame(game: $game, fiatCurrency: $fiatCurrency, cryptoCurrency: $cryptoCurrency) {
      game_url
      strategy
    }
  }
`;

export const GAME_PROVIDER_QUERY = gql`
  query gameProvider($id: ID, $slug: String) {
    gameProvider(id: $id, slug: $slug) {
      id
      enabled
      name
      slug
      image
    }
  }
`;

export const GAME_PRODUCER_QUERY = gql`
  query gameProducer($id: ID, $slug: String) {
    gameProducer(id: $id, slug: $slug) {
      id
      enabled
      name
      display_name
      slug
      image
    }
  }
`;

// TODO: providers in backend are no longer used in frontend, should be removed soon
export const GAME_PROVIDERS_QUERY = gql`
  query gameProviders {
    gameProviders {
      id
      enabled
      name
      slug
      image
    }
  }
`;

export const GAME_PRODUCERS_QUERY = gql`
  query gameProducers {
    gameProducers {
      id
      name
      display_name
      enabled
      slug
      order
      image
    }
  }
`;

export const GAME_SEARCH_QUERY = gql`
  query gameSearch($producerSlug: String, $keyword: String, $first: Int!, $page: Int, $orderBy: [QueryGameSearchOrderByOrderByClause!]) {
    gameSearch(producerSlug: $producerSlug, keyword: $keyword, first: $first, page: $page, orderBy: $orderBy) {
      data {
        ...gameFields
      }
      paginatorInfo {
        ...paginatorInfoFields
      }
    }
  }
  ${gameFields}
  ${paginatorInfoFields}
`;
