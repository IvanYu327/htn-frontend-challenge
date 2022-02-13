//Compares search criteria against the event passed through to determine if it should be shown
export const showEvent = (query, event) => {
  var searchPhrase = query["search"].trim().toLowerCase();
  var eventName = event.name.toLowerCase();
  var containsKeyword = eventName.includes(searchPhrase);

  var isLoggedIn = sessionStorage.getItem("name") !== "";
  var hasPermsForEvent = event.permission === "private" ? isLoggedIn : true;

  var matchesType;

  if (!query["activity"] && !query["workshop"] && !query["tech_talk"]) {
    matchesType = true;
  } else {
    matchesType = query[event.event_type];
  }

  //   console.log(searchPhrase + "|" + eventName);
  //   console.log(containsKeyword);
  //   console.log(hasPermsForEvent);
  //   console.log(matchesType);

  return containsKeyword && hasPermsForEvent && matchesType;
};
