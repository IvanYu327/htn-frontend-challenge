import React, { useState } from "react";
import EventCardFilter from "./EventCardFilter";

import "../../styles/EventSearchPage.css";

const EventSearcher = () => {
  const [searchQuery, setSearchQuery] = useState({
    search: "",
    workshop: false,
    activity: false,
    tech_talk: false,
  });

  const sessionName = sessionStorage.getItem("name");
  return (
    <>
      <div className="event-searcher-description">
        <h1 className="title">Events</h1>
        <h3>
          What will you learn next
          {sessionName !== "" && sessionName !== null ? (
            <span className="event-search-username">
              {" " + sessionStorage.getItem("name")}
            </span>
          ) : null}
          ?
        </h3>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Events"
          className="search-query-input"
          onChange={(e) =>
            setSearchQuery({
              ...searchQuery,
              search: e.target.value,
            })
          }
          value={searchQuery.search}
        />

        <div className="event-search-checkbox-container">
          <div className="checkbox workshop">
            <label>
              <input
                type="checkbox"
                id="workshop checkbox"
                onChange={(e) =>
                  setSearchQuery({
                    ...searchQuery,
                    workshop: !searchQuery.workshop,
                  })
                }
              />
              <span>Workshop</span>
            </label>
          </div>
          <div className="checkbox activity">
            <label>
              <input
                type="checkbox"
                id="activity checkbox"
                className="checkbox"
                onChange={(e) =>
                  setSearchQuery({
                    ...searchQuery,
                    activity: !searchQuery.activity,
                  })
                }
              />
              <span>Activity</span>
            </label>
          </div>
          <div className="checkbox tech-talk">
            <label>
              <input
                type="checkbox"
                id="tech_talk checkbox"
                className="checkbox"
                onChange={(e) =>
                  setSearchQuery({
                    ...searchQuery,
                    tech_talk: !searchQuery.tech_talk,
                  })
                }
              />
              <span>Tech Talk</span>
            </label>
          </div>
        </div>
      </div>

      <EventCardFilter searchQuery={searchQuery} />
    </>
  );
};

export default EventSearcher;
