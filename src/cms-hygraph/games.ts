export const GAMES_QUERY = gql`
  query games {
    games {
      id
      slug
      coverImage {
        url
      }
      videoArt {
        id
        url
        handle
      }
    }
  }
`;

export const PROVIDERS_QUERY = gql`
  query gameProviders {
    gameProviders {
      id
      name
      slug
      image {
        url
      }
    }
  }
`;
export const PROVIDER_QUERY = gql`
  query gameProvider($where: GameProviderWhereUniqueInput!) {
    gameProvider(where: $where) {
      id
      name
      slug
      image {
        url
      }
    }
  }
`;
