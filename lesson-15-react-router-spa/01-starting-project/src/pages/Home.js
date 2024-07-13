import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Homepage() {
  const navigate = useNavigate();

  function navigationHandler() {
    navigate("/products");
  }
  return (
    <div>
      <h2>My Homepage</h2>
      <p>
        Go to <Link to="products">the list of products</Link>
      </p>
      <p>
        <button onClick={navigationHandler}>product</button>
      </p>
    </div>
  );
}
