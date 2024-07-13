import { Link, useParams } from "react-router-dom";

export default function ProductDetails() {
  const params = useParams();
  //  
  return (
    <>
    
      <h1>Products Details page</h1>
      <p>{params.productID}</p>
      <p> <Link to=".." relative="path">Back</Link></p>
    </>
  );
}
