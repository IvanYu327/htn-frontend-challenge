import React from "react";
import {
  UnixToDate,
  UnixToTime,
  capitalizeFirstLetter,
} from "../Functions/HelperFunctions";
import { useNavigate } from "react-router-dom";
import "../../styles/EventCard.css";
import activityIcon from "../../images/activity-icon.png";
import techTalkIcon from "../../images/tech-talk-icon.png";
import workshopIcon from "../../images/workshop-icon.png";
import defaultIcon from "../../images/default-event-icon.png";

const renderCardIcon = (eventType) => {
  switch (eventType) {
    case "Activity":
      return <img className="event-icon" src={activityIcon} alt="icon" />;
    case "Workshop":
      return <img className="event-icon" src={workshopIcon} alt="icon" />;
    case "Tech talk":
      return <img className="event-icon" src={techTalkIcon} alt="icon" />;
    default:
      return <img className="event-icon" src={defaultIcon} alt="icon" />;
  }
};

const EventCard = ({ event }) => {
  let navigate = useNavigate();

  const routeChange = () => {
    let path = event.name.replace(/ /g, "_");
    navigate("/" + event.id + "/" + path);
  };

  const date = UnixToDate(event.start_time);
  const startTime = UnixToTime(event.start_time);
  const endTime = UnixToTime(event.end_time);
  const eventType = capitalizeFirstLetter(event.event_type);
  const eventPerms = capitalizeFirstLetter(event.permission);

  return (
    <div className="event-card" onClick={routeChange}>
      <div className="event-content">
        <h3 className="event-card-title">{event.name}</h3>
        <div>
          {date} {startTime}-{endTime}
        </div>

        <span className="event-tag">{eventType}</span>
        <span className="event-tag">{eventPerms}</span>
      </div>
      {renderCardIcon(eventType)}
    </div>
  );
};

export default EventCard;
