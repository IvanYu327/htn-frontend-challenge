import React, { useState } from "react";
import EventCardFilter from "./EventCardFilter";

const EventSearcher = () => {
  // const client = new ApolloClient({
  //   uri: "https://api.hackthenorth.com/v3/graphql",
  //   cache: new InMemoryCache(),
  // });

  const [searchQuery, setSearchQuery] = useState({
    search: "",
    workshop: false,
    activity: false,
    tech_talk: false,
  });

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log(searchQuery);
  };

  return (
    <>
      <div className="event-searcher-description">
        <h1 className="title">Events</h1>
        <h2>What will you learn next?</h2>
        <p>
          Here at Hack the North, we believe in continual learning smth
          inspirtaional idk
        </p>
      </div>

      <div className="search-bar">
        <form className="event-search" onSubmit={submitHandler}>
          <div className="event-search-bar">
            <input
              type="text"
              placeholder="Search Events"
              className="prompt"
              onChange={(e) =>
                setSearchQuery({
                  ...searchQuery,
                  search: e.target.value,
                })
              }
              value={searchQuery.search}
            />
          </div>
          <div className="event type checkboxes">
            <input
              type="checkbox"
              id="workshop checkbox"
              className="workshop checkbox"
              onChange={(e) =>
                setSearchQuery({
                  ...searchQuery,
                  workshop: !searchQuery.workshop,
                })
              }
            />
            Workshop
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
            Activity
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
            Tech Talk
          </div>
        </form>
      </div>

      <EventCardFilter searchQuery={searchQuery} />
    </>
  );
};

export default EventSearcher;
