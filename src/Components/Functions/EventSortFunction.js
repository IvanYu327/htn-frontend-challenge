//Sorting Function
export const orderEvents = (eventData) => {
  var order = new Array(eventData.length);

  // iterate of the event objects, keep track of just their unique ids and their start time
  for (var x = 0; x < order.length; x++) {
    order[x] = new Array(2);
    order[x][0] = eventData[x].id;
    order[x][1] = eventData[x].start_time;
  }

  //sort ascending since want most recent first
  order.sort(function (a, b) {
    return a[1] - b[1];
  });

  for (var y = 0; y < order.length; y++) {
    //remove the start time for easier reading since we only need the order of ids
    order[y] = order[y][0];
  }

  return order;
};
