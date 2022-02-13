import React, { useState } from "react";
import EventCardFilter from "./EventCardFilter";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const EventSearcher = () => {
  const client = new ApolloClient({
    uri: "https://api.hackthenorth.com/v3/graphql",
    cache: new InMemoryCache(),
  });

  const [searchQuery, setSearchQuery] = useState({
    search: "",
    workshop: false,
    activity: false,
    tech_talk: false,
  });

  const submitHandler = (e) => {
    e.preventDefault();

    console.log(searchQuery);
  };

  return (
    <div>
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
            <input type="submit" value="Search" />
          </div>
          <div className="event type checkboxes">
            <input
              type="checkbox"
              id="workshop checkbox"
              className="workshop checkbox"
              value="Workshop"
              onChange={(e) =>
                setSearchQuery({
                  ...searchQuery,
                  workshop: e.target.value,
                })
              }
              value={!searchQuery.workshop}
            />
            Workshop
            <input
              type="checkbox"
              id="activity checkbox"
              className="checkbox"
              value="Activity"
              onChange={(e) =>
                setSearchQuery({
                  ...searchQuery,
                  activity: e.target.value,
                })
              }
              value={!searchQuery.activity}
            />
            Activity
            <input
              type="checkbox"
              id="tech talk checkbox"
              className="checkbox"
              value="Tech Talk"
              onChange={(e) =>
                setSearchQuery({
                  ...searchQuery,
                  techTalk: e.target.value,
                })
              }
              value={!searchQuery.techTalk}
            />
            Tech Talk
          </div>
        </form>
      </div>
      <ApolloProvider client={client}>
        <EventCardFilter searchQuery={searchQuery} />
      </ApolloProvider>
    </div>
  );
};

export default EventSearcher;
