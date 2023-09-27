import gql from "graphql-tag";

export const ADD_TO_WHTIELIST_MUTATION = gql`
  mutation addToWhitelist(
    $userId: Int!
    $addressName: String!
    $address: String!
    $currency: String!
    $code: String!
  ) {
    addToWhitelist(
      input: {
        userId: $userId
        addressName: $addressName
        address: $address
        currency: $currency
        code: $code
      }
    ) {
      title
      description
    }
  }
`;

export const REMOVE_FROM_WHITELIST_MUTATION = gql`
  mutation removeFromWhitelist($address: String!, $userId: Int!) {
    removeFromWhitelist(input: { address: $address, userId: $userId }) {
      title
      description
    }
  }
`;
