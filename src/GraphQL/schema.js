import gql from "graphql-tag";

//Query for returning preview info of an event
export const GET_EVENT_CARDS = gql`
  {
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

//query to return all information about one event by its id
export const GET_EVENT_BY_ID = gql`
  query getEvent($sampleEventId: Float!) {
    sampleEvent(id: $sampleEventId) {
      id
      name
      event_type
      permission
      start_time
      end_time
      description
      speakers {
        profile_pic
        name
      }
      related_events
      private_url
      public_url
    }
  }
`;

//query to return event names by id
export const GET_EVENT_NAMES = gql`
  {
    sampleEvents {
      id
      name
      permission
    }
  }
`;
