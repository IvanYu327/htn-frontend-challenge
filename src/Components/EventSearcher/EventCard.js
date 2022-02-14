import React from "react";
import { UnixToDate, UnixToTime } from "./Functions/HelperFunctions";
import { Link, useNavigate } from "react-router-dom";

const EventCard = ({ event }) => {
  let navigate = useNavigate();

  const routeChange = () => {
    let path = event.name;
    path = path.replace(/ /g, "_");
    navigate(path);
  };

  const date = UnixToDate(event.start_time);
  const startTime = UnixToTime(event.start_time);
  const endTime = UnixToTime(event.end_time);

  return (
    <div className="card" onClick={routeChange}>
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
