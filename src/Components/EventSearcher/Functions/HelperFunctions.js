//Find the event object with the corresponding ID
export const getEventByID = (events, ID) => {
  for (var x = 0; x < events.length; x++) {
    if (events[x].id === ID) {
      return events[x];
    }
  }
};

//Get the date from unix time
export const UnixToDate = (unix) => {
  var date = new Date(unix);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var year = date.getFullYear();
  var month = months[date.getMonth()];
  var day = date.getDate();

  return month + " " + day + " " + year;
};

//Get the time of day from a unix time
export const UnixToTime = (unix) => {
  var date = new Date(unix);
  // Hours part from the timestamp
  var hours = date.getHours();
  // Minutes part from the timestamp
  var minutes = ("0" + date.getMinutes()).slice(-2);

  //HH:MM formate
  return hours + ":" + minutes;
};
