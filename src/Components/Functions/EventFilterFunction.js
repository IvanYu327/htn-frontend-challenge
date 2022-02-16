//Compares search criteria against the event passed through to determine if it should be shown
export const showEvent = (query, event) => {
  var searchPhrase = query["search"].trim().toLowerCase();
  var eventName = event.name.toLowerCase();

  // check if search phrase is in event name
  var containsKeyword = eventName.includes(searchPhrase);

  // check if logged in
  var isLoggedIn =
    sessionStorage.getItem("name") !== "" &&
    sessionStorage.getItem("name") !== null;

  // check user permissions
  var hasPermsForEvent = event.permission === "private" ? isLoggedIn : true;

  // check if the type of event matches
  var matchesType;

  if (!query["activity"] && !query["workshop"] && !query["tech_talk"]) {
    matchesType = true;
  } else {
    matchesType = query[event.event_type];
  }

  return containsKeyword && hasPermsForEvent && matchesType;
};

//Determines if a related event should be shown based on the user's permissions
export const showRelatedEvent = (event, relatedIDs) => {
  if (relatedIDs.includes(event.id)) {
    if (event.permission === "public") {
      return true;
    } else {
      return (
        sessionStorage.getItem("name") !== "" &&
        sessionStorage.getItem("name") !== null
      );
    }
  }
  return false;
};
