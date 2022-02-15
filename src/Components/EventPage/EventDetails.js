import React from "react";
import { useQuery } from "@apollo/client";
import { GET_EVENT_CARDS } from "../../GraphQL/schema";
import { showRelatedEvent } from "../EventSearcher/Functions/EventFilterFunction";
import EventCard from "../EventSearcher/EventCard";

const RelatedEvents = (relatedIDs, events) => {
  return relatedIDs.length === 0 ? (
    <div>
      <div>Related Events</div>
      <div>There are no related events</div>
    </div>
  ) : (
    <div>
      <div>Related Events</div>
      {events.map((event) => {
        var show = showRelatedEvent(event, relatedIDs);
        return show ? <EventCard event={event} key={event.id} /> : null;
      })}
    </div>
  );
};

const EventDetails = ({ event }) => {
  var relatedIDs = event.related_events;

  if (relatedIDs.length < 2) {
    // console.log("turning into array");
    relatedIDs = Array.from(String(relatedIDs), Number);
  }
  //   console.log(relatedIDs);

  const { error, data, loading } = useQuery(GET_EVENT_CARDS);
  if (loading) return <div>loading</div>;
  if (error) return <div>Something Went Wrong!</div>;
  //   console.log(data);

  return (
    <div>
      <div>{event.name}</div>
      <div>{event.description}</div>
      <div>{event.related_events}</div>
      <div>{RelatedEvents(relatedIDs, data.sampleEvents)}</div>
    </div>
  );
};

export default EventDetails;
