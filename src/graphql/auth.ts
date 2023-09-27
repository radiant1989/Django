import gql from "graphql-tag";
import { userFields } from "./fragments";
import { NewUserInput } from "~/types";
type SocialProvider = "google" | "facebook" | "twitter" | "telegram";
export const CREATE_USER_MUTATION = gql`
  mutation createUser($input: NewUserInput) {
    createUser(input: $input) {
      token
      user {
        ...userFields
      }
    }
  }
  ${userFields}
`;
export const LOGIN_MUTATION = gql`
  mutation login(
    $email: String
    $password: String!
    $username: String
    $code: String
  ) {
    login(
      email: $email
      password: $password
      username: $username
      code: $code
    ) {
      token
      user {
        ...userFields
      }
    }
  }
  ${userFields}
`;

export const ME_QUERY = gql`
  query me {
    me {
      ...userFields
      roles {
        id
        name
      }
    }
  }
  ${userFields}
`;
export const MAKE_QR_MUTATION = gql`
  mutation makeQr {
    makeQr {
      secret
      urlQrCode
    }
  }
`;
export const CONFIRM_QR_MUTATION = gql`
  mutation confirmQr($code: String!) {
    confirmQr(code: $code)
  }
`;

export const DISABLE_TWOFA_MUTATION = gql`
  mutation disableTwoFa($code: String!, $password: String!) {
    disableTwoFa(code: $code, password: $password)
  }
`;
export const GET_SOCIAL_URL_QUERY = gql`
  query getSocialContent($provider: SocialProvider!) {
    getSocialContent(provider: $provider) {
      url
    }
  }
`;

export const GET_SOCIAL_TELEGRAM_URL_QUERY = gql`
  query getSocialContent($provider: SocialProvider!) {
    getSocialContent(provider: $provider) {
      button
    }
  }
`;

export const LOGIN_SOCIAL_MUTATION = gql`
  mutation loginSocial($hash: String!) {
    loginSocial(hash: $hash) {
      token
      socialResponse {
        needsMerge
        email
        socialiteId
        userId
        wasRecentlyCreated
      }
      user {
        ...userFields
        incomplete_profile
      }
    }
  }
  ${userFields}
`;

export const SEND_RESET_LINK_MUTATION = gql`
  mutation sendResetLink($email: String!) {
    sendResetLink(email: $email)
  }
`;

export const RESET_PASSWORD_MUTATION = gql`
  mutation resetPassword(
    $email: String!
    $password: String!
    $password_confirmation: String!
    $token: String!
    $code: String
  ) {
    resetPassword(
      input: {
        email: $email
        password: $password
        password_confirmation: $password_confirmation
        token: $token
        code: $code
      }
    )
  }
`;

export const FINISH_REGISTRATION_MUTATION = gql`
  mutation finishRegistration(
    $hash: String!
    $email: String!
    $username: String!
    $password: String!
  ) {
    finishRegistration(
      hash: $hash
      input: { email: $email, username: $username, password: $password }
    ) {
      token
      user {
        ...userFields
      }
    }
  }
  ${userFields}
`;

export const MERGE_ACCOUNTS_MUTATION = gql`
  mutation mergeAccounts($hash: String!, $email: String!, $password: String!) {
    mergeAccounts(hash: $hash, email: $email, password: $password) {
      token
      user {
        ...userFields
      }
    }
  }
  ${userFields}
`;

export const LOGOUT_MUTATION = gql`
  mutation logout {
    logout
  }
`;
