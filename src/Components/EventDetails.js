import React from "react";
import { useParams } from "react-router-dom";

const EventDetails = () => {
  const params = useParams();
  const eventName = params.eventName.replace(/_/g, " ");

  return <div>{eventName}</div>;
};

export default EventDetails;
