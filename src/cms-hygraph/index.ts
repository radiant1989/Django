export { useCMSAsyncQuery } from './hooks';
export type * from './types';

export * from './games';
export * from './promo';

export const USERS_QUERY = gql`
  query users{
    users{
      id
      name
    }
  }
`;

export const MODULES_QUERY = gql`
  query modules {
    modules {
      id
      title
      slug
      headerImage {
        url
      }
    }
  }
`;
