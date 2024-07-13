import { useEffect, useState } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../https.js";
export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePalces] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  // console.log(availablePlaces)

  useEffect(() => {
    const getPlace = async () => {
      // await fetch("http://localhost:3000/places")
      //   .then((response) => {
      //     return response.json();
      //   })
      //   .then((resData) => {
      //    setAvailablePalces(resData.places) ;
      //   });
      setIsFetching(true);
      try {
        const places = await fetchAvailablePlaces();
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvailablePalces(sortedPlaces);
          setIsFetching(false);
        });
      } catch (error) {
        //setError(error);
        setError({
          message:
            "Could not fetch places please try again later !" || error.message,
        });
      }

      setIsFetching(false);
    };
    getPlace();
  }, []);
  if (error) {
    return <Error title="An error occur" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="fetching places..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
