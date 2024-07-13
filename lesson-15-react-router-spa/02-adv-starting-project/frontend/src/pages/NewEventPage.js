import React from "react";
import EventForm from "../components/EventForm";


function NewEventPage() {
  return <EventForm method='post'/>;
}

export default NewEventPage;

// So that's how we can extract this submitted form data

// with help of that request that's forwarded

// or that's passed into this action function by react-router.





// export async function action({ request, params }) {
//   const data = await request.formData();

//   const eventData = {
//     title: data.get("title"),
//     image: data.get("image"),
//     date: data.get("date"),
//     description: data.get("description"),
//   };

//   const response = await fetch("http://localhost:6004/events", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(eventData),
//   });
//   if (response.status === 422) {
//     return response;
//   }

//   if (!response.ok) {
//     throw json({ message: "Could not save event." }, { status: 500 });
//   }

//   return redirect("/events");
// }
