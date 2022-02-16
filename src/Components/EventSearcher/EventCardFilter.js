import React from "react";
import { useQuery } from "@apollo/client";
import { GET_EVENT_CARDS } from "../../GraphQL/schema";
import { orderEvents } from "../Functions/EventSortFunction";
import { getEventByID } from "../Functions/HelperFunctions";
import { showEvent } from "../Functions/EventFilterFunction";
import EventCard from "./EventCard";
import "../../styles/EventCard.css";

//Event card filter
//Takes the search parameters and returns only the events that fit them and the user has the permissions to view it
const EventCardFilter = ({ searchQuery }) => {
  // fetch data using the query that returns preview details for each event
  const { error, data, loading } = useQuery(GET_EVENT_CARDS);

  if (loading) return null;

  if (error) return <h3>Something Went Wrong!</h3>;

  const events = data.sampleEvents;
  const order = orderEvents(events);
  var foundResults = false;

  // filter through the events and call the EventCard to show cards
  return (
    <>
      <div className="event-cards-wrapper">
        {order.map((ID) => {
          const currEvent = getEventByID(data.sampleEvents, ID);
          const toShowEvent = showEvent(searchQuery, currEvent);
          if (toShowEvent) {
            foundResults = true;
          }
          return toShowEvent ? (
            <EventCard event={currEvent} key={currEvent.id} />
          ) : null;
        })}
      </div>
      {foundResults ? null : <h3> No events for this search! </h3>}
    </>
  );
};

export default EventCardFilter;
