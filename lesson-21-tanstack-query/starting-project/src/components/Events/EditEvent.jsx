import { Link, useNavigate, useParams } from "react-router-dom";

import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getEventbyId, queryClient, updateEvent } from "../../util/http.js";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function EditEvent() {
  const navigate = useNavigate();
  const params = useParams();

  //update events
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["events", { id: params.id }],
    queryFn: ({ signal }) => getEventbyId({ signal, id: params.id }),
  });

  const { mutate } = useMutation({
    mutationFn: updateEvent,

    onMutate: async (data) => {
      const newEvent = data.event;
      await queryClient.cancelQueries({
        queryKey: ["events", { id: params.id }],
      });

      //rolled back query if any request does match backend validation
      const previousEvent = queryClient.getQueryData([
        "events",
        { id: params.id },
      ]);
      queryClient.setQueryData(["events", { id: params.id }], newEvent);

      return { previousEventKey: previousEvent };
    },
    // on error takes a function  ===so >we can call query client set query data, again,to again manually update the stored data old event

    // which was previously stored with context.previousEventKey .And with that, we're rolling back this optimistic update if the mutation fails.
    onError: (error, data, context) => {
      queryClient.setQueriesData(
        ["events", { id: params.id }],
        context.previousEventKey
      );
    },
    //onSettled will simply be called whenever this mutation is done, no matter if it failed or succeeded
    onSettled: () => {
      queryClient.invalidateQueries(["events", { id: params.id }]);
    },
  });
  let content;
  if (isPending) {
    content = (
      <div className="center">
        <LoadingIndicator />
      </div>
    );
  }

  if (isError) {
    content = (
      <>
        <ErrorBlock
          title="Failed to load event"
          message={
            error.info?.message ||
            "Failed to load event. Please check your inputs and try again later"
          }
        />
        <div className="forms-actions">
          <Link to="../" className="button">
            Okay
          </Link>
        </div>
      </>
    );
  }

  if (data) {
    content = (
      <EventForm inputData={data} onSubmit={handleSubmit}>
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button">
          Update
        </button>
      </EventForm>
    );
  }

  function handleSubmit(formData) {
    mutate({ id: params.id, event: formData });
    navigate("../");
  }

  function handleClose() {
    navigate("../");
  }

  return <Modal onClose={handleClose}>{content}</Modal>;
}
