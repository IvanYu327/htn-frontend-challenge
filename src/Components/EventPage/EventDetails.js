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

const RelatedEvents = (relatedIDs, events) => {
  return relatedIDs.length === 0 ? (
    <div>
      <div>Related Events</div>
      <div>There are no related events</div>
    </div>
  ) : (
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

const SpeakerProfilePicture = (url) => {
  console.log(url);
  return url !== null && url.length > 1 ? (
    <img className="speaker-pfp" src={url} alt="profile picture" />
  ) : (
    <img className="speaker-pfp" src={defaultPfp} alt="profile picture" />
  );
};

const publicURL = (url) => {
  return url.length > 1 ? (
    <div className="url-container">
      <span>Watch: </span>
      <a href={url} target="_blank">
        {url}
      </a>
    </div>
  ) : null;
};

const privateURL = (url) => {
  return isLoggedIn() && url.length > 1 ? (
    <div className="url-container">
      <span>Join: </span>
      <a href={url} target="_blank">
        {url}
      </a>
    </div>
  ) : null;
};

const EventDetails = ({ event }) => {
  var relatedIDs = event.related_events;

  if (relatedIDs.length < 2) {
    relatedIDs = Array.from(String(relatedIDs), Number);
  }

  const { error, data, loading } = useQuery(GET_EVENT_CARDS);
  if (loading) return <div>loading</div>;
  if (error) return <div>Something Went Wrong!</div>;

  const date = UnixToDate(event.start_time);
  const startTime = UnixToTime(event.start_time);
  const endTime = UnixToTime(event.end_time);
  const eventType = capitalizeFirstLetter(event.event_type);
  const eventPerms = capitalizeFirstLetter(event.permission);
  const speakers = event.speakers;

  return (
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
