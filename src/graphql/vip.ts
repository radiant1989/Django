import gql from "graphql-tag";

export const VIP_QUERY = gql`
  query vip {
    vip {
      xp
    }
  }
`;
