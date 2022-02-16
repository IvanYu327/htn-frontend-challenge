import React from "react";
import { Route, Routes } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import "./styles/App.css";

import EventSearcher from "./Components/EventSearcher/EventSearcher.js";
import Navbar from "./Components/Navbar/Navbar";
import EventDetails from "./Components/EventPage/EventPage";
import PageNotFound from "./Components/PageNotFound";

function App() {
  const client = new ApolloClient({
    uri: "https://api.hackthenorth.com/v3/graphql",
    cache: new InMemoryCache(),
  });

  return (
    <>
      <ApolloProvider client={client}>
        <Navbar />
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/HTN-EventSearcher/" element={<EventSearcher />} />
          <Route
            path="/HTN-EventSearcher/:eventName"
            element={<EventDetails />}
          />
        </Routes>
      </ApolloProvider>
    </>
  );
}

export default App;
