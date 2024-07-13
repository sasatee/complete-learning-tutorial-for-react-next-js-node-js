import React, { Suspense } from "react";
import {
  Await,
  defer,
  json,
  redirect,
  useRouteLoaderData,
} from "react-router-dom";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";

function EventDetailPage() {
  const { event, events } = useRouteLoaderData("event-detail");

  return (
    <>
      <Suspense fallback={<p style={{textAlign:"center"}}>loading event</p>}>
        <Await resolve={event}>
          {(loadedSingleEvent) => <EventItem event={loadedSingleEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{textAlign:"center"}}>loading events</p>}>
        <Await resolve={events}>
          {(loadedListOfEvent) => <EventsList events={loadedListOfEvent} />}
        </Await>
      </Suspense>
    </>
  );
}

export default EventDetailPage;

export async function loader({ request, params }) {
  const id = params.eventId;
  //console.log(id)
  return defer({
    event: await loadedEvent(id),    //we would wait for the event details to be loaded before loading this page component at all
    events: loadedEvents(),
  });
}

export async function loadedEvent(id) {
  
  //console.log(id)

  const response = await fetch("http://localhost:6004/events/" + id);

  if (!response.ok) {
    throw json({ message: "Could not fetche event details" }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.event;
  }
}

export async function loadedEvents() {
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

export async function action({ params, request }) {
  const eventId = params.eventId;
  //request.method means => method which has been set to client side browser, ===>useSubmit() react-route
  const response = await fetch("http://localhost:6004/events/" + eventId, {
    method: request.method,
  });
  if (!response.ok) {
    throw json({ message: "Could not delete event." }, { status: 500 });
  }
  return redirect("/events");
}
