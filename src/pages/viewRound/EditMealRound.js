import React from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
const EditMealRound = () => {
  const params = useParams();
  console.log("edit page", params.id);
  return <div>EditMealRound</div>;
};

export default EditMealRound;
