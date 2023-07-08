// Get request

import { Timestamp } from "mongodb";

function currentTime() {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let x = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes.toString().padStart(2, "0");
  let currentTime = hours + ":" + minutes + " " + x;
  return currentTime;
}

export default function handler(request, response) {
  console.log(currentTime());
  if (request.method == "GET") {
    return response.status(200).json(currentTime());
  }
}
