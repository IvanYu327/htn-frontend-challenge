import React from "react";
import { useQuery } from "@apollo/client";
import { GET_EVENT_CARDS } from "../../GraphQL/GetEventCards";
import { orderEvents } from "./Functions/EventSortFunction";
import { getEventByID } from "./Functions/HelperFunctions";
import { showEvent } from "./Functions/EventFilterFunction";
import EventCard from "./EventCard";

const EventCardFilter = ({ searchQuery }) => {
  const { error, data, loading } = useQuery(GET_EVENT_CARDS);

  // console.log({ error, data, loading });

  if (loading) return <div>spinner</div>;

  if (error) return <div>oh nooooo!</div>;

  const events = data.sampleEvents;
  const order = orderEvents(events);

  return (
    <div className="card">
      {order.map((ID) => {
        const currEvent = getEventByID(data.sampleEvents, ID);

        console.log(showEvent(searchQuery, currEvent));

        return <EventCard event={currEvent} />;
      })}
    </div>
  );
};

export default EventCardFilter;
