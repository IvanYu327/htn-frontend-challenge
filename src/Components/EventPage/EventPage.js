import React from "react";
import { useParams } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { GET_EVENT_BY_ID } from "../../GraphQL/schema";
import PageNotFound from "../PageNotFound";
import EventDetails from "./EventDetails";

const EventPage = () => {
  const params = useParams();
  const eventName = params.eventName.replace(/_/g, " ");

  const sampleEventId = parseInt(params.eventID);
  const { loading, error, data } = useQuery(GET_EVENT_BY_ID, {
    variables: { sampleEventId },
  });

  if (loading) return null;

  if (error) return <div>Something Went Wrong!</div>;

  const event = data.sampleEvent;
  return eventName === event.name ? (
    <EventDetails event={event} />
  ) : (
    <PageNotFound />
  );
};

export default EventPage;
