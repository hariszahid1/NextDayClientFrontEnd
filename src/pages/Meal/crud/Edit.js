import React, { useState,useEffect } from "react";
import MealForm from "./Form/MealForm";
import axios from "axios";
import { useParams } from "react-router-dom";

const EditMeal = () => {
  const [meal,setMeal]=useState({})
  const params = useParams();

  const GetMeal = async () => {
    await axios
      .get(`http://localhost:8001/api/meals/getMeal/${params.id}`)
      .then((res) => {
        console.log(res.data,"data")
        setMeal(res.data);
      });
  };

  useEffect(() => {
    GetMeal();
  }, []);
  return (
    <div>
      <MealForm 
      meal={meal}
      editMeal={true}
      />
    </div>
  );
};

export default EditMeal;
