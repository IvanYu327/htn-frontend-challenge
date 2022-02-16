import React from "react";
import { useQuery } from "@apollo/client";
import { GET_EVENT_CARDS } from "../../GraphQL/schema";
import { showRelatedEvent } from "../Functions/EventFilterFunction";
import EventCard from "../EventSearcher/EventCard";
import "../../styles/EventDetails.css";
import {
  capitalizeFirstLetter,
  UnixToDate,
  UnixToTime,
  isLoggedIn,
} from "../Functions/HelperFunctions";
import defaultPfp from "../../images/default-pfp.png";
import PageNotFound from "../PageNotFound";

//function to determine if we need to show related events, then show them
const RelatedEvents = (relatedIDs, events) => {
  return relatedIDs.length === 0 ? null : (
    <div>
      <h3 className="related-title">Related Events</h3>
      <div className="event-cards-wrapper">
        {events.map((event) => {
          var show = showRelatedEvent(event, relatedIDs);
          return show ? <EventCard event={event} key={event.id} /> : null;
        })}
      </div>
    </div>
  );
};

//function to determine if there are speakers for the event, then show them
const Speakers = (speakers) => {
  return speakers.length < 1 ? null : (
    <div>
      <h3 className="speakers-title">Speakers</h3>
      <div className="speakers-container">
        {speakers.map((speaker) => {
          return (
            <div className="speaker-container">
              {SpeakerProfilePicture(speaker.profile_pic)}
              <p className="speaker-name">{speaker.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

//function to render speaker pfp based on if url passed in was valid
const SpeakerProfilePicture = (url) => {
  console.log(url);
  return url !== null && url.length > 1 ? (
    <img className="speaker-pfp" src={url} alt="profile" />
  ) : (
    <img className="speaker-pfp" src={defaultPfp} alt="no profile" />
  );
};

//function to check if the public url field passed through exists and then render it
const publicURL = (url) => {
  return url.length > 1 ? (
    <div className="url-container">
      <span>Watch: </span>
      <a href={url} target="_blank" rel="noopener noreferrer">
        {url}
      </a>
    </div>
  ) : null;
};

//function to check if the private url field passed through exists and then render it if the user is logged in
const privateURL = (url) => {
  return isLoggedIn() && url.length > 1 ? (
    <div className="url-container">
      <span>Join: </span>
      <a href={url} target="_blank" rel="noopener noreferrer">
        {url}
      </a>
    </div>
  ) : null;
};

//Event Details page
// uses the above functions to render the events details, also based on if the user is logged in or not
const EventDetails = ({ event }) => {
  var relatedIDs = event.related_events;

  if (relatedIDs.length < 2) {
    relatedIDs = Array.from(String(relatedIDs), Number);
  }

  const { error, data, loading } = useQuery(GET_EVENT_CARDS);
  if (loading) return null;
  if (error) return <h3>Something Went Wrong!</h3>;

  //get and format event details into desired format
  const date = UnixToDate(event.start_time);
  const startTime = UnixToTime(event.start_time);
  const endTime = UnixToTime(event.end_time);
  const eventType = capitalizeFirstLetter(event.event_type);
  const eventPerms = capitalizeFirstLetter(event.permission);
  const speakers = event.speakers;

  // returns the event page unless it is private and the user isnt logged in
  return !isLoggedIn() && event.permission === "private" ? (
    <PageNotFound type="Login Required" />
  ) : (
    <div className="event-details-wrapper">
      <h1 className="event-title">{event.name}</h1>
      <h3>
        {date} {startTime} - {endTime}
      </h3>
      <div className="tags-container">
        <span className="event-tag">{eventType}</span>
        <span className="event-tag">{eventPerms}</span>
      </div>
      {Speakers(speakers)}
      <p className="event-description">{event.description}</p>
      {publicURL(event.public_url)}
      {privateURL(event.private_url)}

      <div>{RelatedEvents(relatedIDs, data.sampleEvents)}</div>
    </div>
  );
};

export default EventDetails;
