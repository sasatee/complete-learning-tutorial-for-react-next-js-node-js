import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EditEventPage from "./pages/EditEventPage";
import ErrorPage from "./pages/ErrorPages";
import EventDetailPage, {
  loader as eventDetailsLoader,
  action as deleteEventAction,
} from "./pages/EventDetailPage";
import EventLayout from "./pages/EventLayout";
import EventsPage, { loaderForEvent as eventsLoader } from "./pages/Events";
import HomePage from "./pages/HomePage";
import NewEventPage from "./pages/NewEventPage";
import RootLayout from "./pages/RootLayout";
import NewsletterPage, {
  action as newletterAction,
} from "./pages/NewsletterPage";

import { action as ManipulateEventActionPatchOrPost } from "./components/EventForm";

const router = createBrowserRouter([
  {
    //main route
    path: "/",
    element: <RootLayout />,
    //if this loader threw an error. But we can also just have this Root level error element
    // and the error would bubble up until it reaches that route.

    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },

      {
        // event parent ancestor
        path: "events",
        element: <EventLayout />,
        //event route slibling
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader,
          },
          {
            //  with use loader data with this special hook provided by a React router in any component
            //  that's on the same level or a lower level
            // than the route where the loader is added to.
            path: ":eventId",
            loader: eventDetailsLoader,
            id: "event-detail",

            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: deleteEventAction,
              },

              {
                path: "edit",
                element: <EditEventPage />,
                action: ManipulateEventActionPatchOrPost,
              },
            ],
          },

          {
            path: "new",
            element: <NewEventPage />,
            action: ManipulateEventActionPatchOrPost,
          },
        ],
      },
      {
        //part of main route
        path: "newsletter",
        element: <NewsletterPage />,
        action: newletterAction,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
