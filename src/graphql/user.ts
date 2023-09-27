import gql from "graphql-tag";
import { userFields } from "./fragments";
export const SAVE_USER_PREFERENCES_MUTATION = gql`
  mutation saveUserPreferences(
    $activeCryptoCode: String
    $activeFiatCode: String
    $ghostMode: Boolean
    $orderedCryptoCodes: [String]
    $showStats: Boolean
    $rainEnabled: Boolean
    $tipsEnable: Boolean
    $displayInfiatEnabled: Boolean
  ) {
    saveUserPreferences(
      preferences: {
        activeCryptoCode: $activeCryptoCode
        activeFiatCode: $activeFiatCode
        ghostMode: $ghostMode
        orderedCryptoCodes: $orderedCryptoCodes
        showStats: $showStats
        rainEnabled: $rainEnabled
        tipsEnable: $tipsEnable
        displayInfiatEnabled: $displayInfiatEnabled
      }
    ) {
      ...userFields
    }
  }
  ${userFields}
`;
