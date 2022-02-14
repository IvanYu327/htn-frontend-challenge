//Compares search criteria against the event passed through to determine if it should be shown
export const showEvent = (query, event) => {
  var searchPhrase = query["search"].trim().toLowerCase();
  var eventName = event.name.toLowerCase();
  var containsKeyword = eventName.includes(searchPhrase);

  // console.log(sessionStorage.getItem("name"));
  var isLoggedIn =
    sessionStorage.getItem("name") !== "" &&
    sessionStorage.getItem("name") !== null;
  // console.log(event.permission + "   " + isLoggedIn);
  var hasPermsForEvent = event.permission === "private" ? isLoggedIn : true;

  // console.log(query);
  // console.log(event.event_type);
  // console.log(!query["activity"] && !query["workshop"] && !query["tech_talk"]);

  var matchesType;

  if (!query["activity"] && !query["workshop"] && !query["tech_talk"]) {
    matchesType = true;
  } else {
    matchesType = query[event.event_type];
  }
  //   console.log(searchPhrase + "|" + eventName);
  //   console.log(containsKeyword);
  console.log(hasPermsForEvent);
  //   console.log(matchesType);

  return containsKeyword && hasPermsForEvent && matchesType;
};
