import React from "react";
import { Await, defer, json, useLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList";

function EventsPage() {
  const { events } = useLoaderData();
  // if(data.isError){
  //   return <p>{data.message}</p>
  // }
  return (
    <React.Suspense fallback={<p style={{ textAlign: "center" }}>Loading..</p>}>
      <Await resolve={events}>
        {(eventLoadedData) => <EventsList events={eventLoadedData} />}
      </Await>
    </React.Suspense>
  );
}

export default EventsPage;
// is that this loader code will not execute on a server.
// This is still all happening in the browser here,
export async function loadedEvent() {
  const response = await fetch("http://localhost:6004/events");

  if (!response.ok) {
    throw json(
      {
        message: "Could not fetch events",
      },
      { status: 500 }
    );
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export function loaderForEvent() {
  return defer({
    events: loadedEvent(),
  });
}
