import React from "react";
import { useQuery } from "@apollo/client";
import { GET_EVENT_CARDS } from "../../GraphQL/schema";
import { orderEvents } from "./Functions/EventSortFunction";
import { getEventByID } from "./Functions/HelperFunctions";
import { showEvent } from "./Functions/EventFilterFunction";
import EventCard from "./EventCard";

const EventCardFilter = ({ searchQuery }) => {
  const { error, data, loading } = useQuery(GET_EVENT_CARDS);

  // console.log({ error, data, loading });

  if (loading) return null;

  if (error) return <div>Something Went Wrong!</div>;

  const events = data.sampleEvents;
  const order = orderEvents(events);
  // console.log("OWA OWA OWA");
  // console.log(searchQuery);
  // console.log(!searchQuery.workshop);
  // console.log(!searchQuery.activity);
  // console.log(!searchQuery.tech_talk);
  return (
    <div className="cards-wrapper">
      {order.map((ID) => {
        const currEvent = getEventByID(data.sampleEvents, ID);
        return showEvent(searchQuery, currEvent) ? (
          <EventCard event={currEvent} key={currEvent.id} />
        ) : null;
      })}
    </div>
  );
};

export default EventCardFilter;
