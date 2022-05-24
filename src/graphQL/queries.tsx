import { gql } from "@apollo/client";

export const LOAD_LASTMESSAGE = gql`
  query GetLatestMessages($channelId: String!) {
    fetchLatestMessages(channelId: $channelId) {
      messageId
      text
      datetime
      userId
    }
  }
`;

export const LOAD_MOREMESSAGE = gql`
  query GetMoreMessages(
    $channelId: String!
    $messageId: String!
    $old: Boolean!
  ) {
    fetchMoreMessages(channelId: $channelId, messageId: $messageId, old: $old) {
      messageId
      text
      datetime
      userId
    }
  }
`;
