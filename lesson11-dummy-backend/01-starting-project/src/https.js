export async function fetchAvailablePlaces() {
  const response = await fetch("http://localhost:3000/places");
  const getData = await response.json();

  if (!response.ok) {
    const error = new Error();
    throw error("Failed to fetch places");
  }
  return getData.places;
}

export async function fetchUserPlaces() {
  const response = await fetch("http://localhost:3000/user-places");
  const getData = await response.json();

  if (!response.ok) {
    const error = new Error();
    throw error("Failed to user places");
  }
  return getData.places;
}

export async function updateUserPlaces(places) {
  const response = await fetch("http://localhost:3000/user-places", {
    method: "PUT",
    body: JSON.stringify({places}),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const resData = await response.json();
  if (!response.ok) {
    const error = new Error();
    throw new error("Failed to update user data.");
  }
  return resData.message;
}
