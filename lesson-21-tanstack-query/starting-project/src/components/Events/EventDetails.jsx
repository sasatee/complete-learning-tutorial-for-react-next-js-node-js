import { Link, Outlet, useNavigate, useParams } from "react-router-dom";

import Header from "../Header.jsx";
import { getEventbyId, queryClient, deleteEvents } from "../../util/http.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import { useState } from "react";
import Modal from "../UI/Modal.jsx";

export default function EventDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
//create event by id useQuery
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["events", { id: params.id }],
    queryFn: ({ signal }) => getEventbyId({ signal, id: params.id }),
  });

  //create events

  const {
    mutate,
    isPending: isPendingDeletion,
    isError: isErrorDeleting,
    error: deleteError,
  } = useMutation({
    mutationFn: deleteEvents,
    onSuccess: () => {
      // invalidateQueries ===> automatic refretch queries '/events' get request and also for '/events/:id'
      //but show http error for '/events:id' because of refresh of both end point so to trouble shoot this issues occuring set 'refreshType:'none'
      queryClient.invalidateQueries({
        queryKey: ["events"],
        refetchType: "none",
      });
      navigate("/events");
    },
  });

  function handleStartDelete() {
    setIsDeleting(true);
  }
  function handleStopDelete() {
    setIsDeleting(false);
  }

  function handleDeleteEvent() {
    mutate({ id: params.id });
  }

  let content;

  if (isPending) {
    content = (
      <div className="center" id="event-details-content">
        <p>Fetching event...</p>
      </div>
    );
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="An error occurred"
        message={
          error.info?.message || "Failed to fetch events data. Try again later."
        }
      />
    );
  }

  if (data) {
    const formattedDate = new Date(data.date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    content = (
      <>
        <header>
          <h1>{data.title}</h1>
          <nav>
            <button onClick={handleStartDelete}>Delete</button>
            <Link to="edit">Edit</Link>
          </nav>
        </header>
        <div id="event-details-content">
          <img src={`http://localhost:3000/${data.image}`} alt={data.title} />
          <div id="event-details-info">
            <div>
              <p id="event-details-location">{data.location}</p>
              <time dateTime={`Todo-DateT$Todo-Time`}>
                {formattedDate} {"  "}@ {data.time}
              </time>
            </div>
            <p id="event-details-description">{data.description}</p>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      {isDeleting && (
        <Modal onClose={handleStopDelete}>
          <h2>Are You Sure? </h2>
          <p>
            Do you really want to delete this event? This action cannot be
            undone.
          </p>
          <div className="form-actions">
            {isPendingDeletion && <p>Deleting, Please wait...</p>}
            {!isPendingDeletion && (
              <>
                <button onClick={handleStopDelete} className="button-text  ">
                  Cancel
                </button>
                <button onClick={handleDeleteEvent} className="button">
                  Delete
                </button>
              </>
            )}
          </div>
          {isErrorDeleting && (
            <ErrorBlock
              title="Failed to delete event"
              message={
                deleteError.info?.message ||
                "Failed to delete event,please try again later."
              }
            />
          )}
        </Modal>
      )}

      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      <article id="event-details">{content}</article>
    </>
  );
}
