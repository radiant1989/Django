export const PROMOS_QUERY = gql`
  query promos {
    promos {
      id
      title
      promoImage {
        url
      }
    }
  }
`;
