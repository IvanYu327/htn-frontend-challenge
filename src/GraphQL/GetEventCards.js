import gql from "graphql-tag";

export const GET_EVENT_CARDS = gql`
  query {
    sampleEvents {
      id
      name
      event_type
      permission
      start_time
      end_time
    }
  }
`;
