import React from "react";
import { UnixToDate, UnixToTime } from "./Functions/HelperFunctions";
import { useNavigate } from "react-router-dom";

const EventCard = ({ event }) => {
  let navigate = useNavigate();

  const routeChange = () => {
    let path = event.name.replace(/ /g, "_");
    navigate("/" + event.id + "/" + path);
  };

  const date = UnixToDate(event.start_time);
  const startTime = UnixToTime(event.start_time);
  const endTime = UnixToTime(event.end_time);

  return (
    <div className="event-card" onClick={routeChange}>
      <div>{event.name}</div>
      <div>{event.event_type}</div>
      <div>{event.permission}</div>
      <div>
        {date} {startTime} - {endTime}
      </div>
    </div>
  );
};

export default EventCard;
