import React, { useState,useEffect } from "react";
import axios from "axios";
import MealMeasurementForm from "./Form/MealMeasurementForm";
import { useParams } from "react-router-dom";
import { IndividualMealMeasurement } from "../../../../utils/Apis";
const EditMealMeasurement = () => {
  const [meal,setMeal]=useState({})
  const params = useParams();

  const GetMealMeasurement = async () => {
    await axios
      .get(`${IndividualMealMeasurement}/${params.id}`)
      .then((res) => {
        console.log(res.data,"data")
        setMeal(res.data);
      });
  };

  useEffect(() => {
    GetMealMeasurement();
  }, []);
  return (
    <div>
      <MealMeasurementForm 
      meal={meal}
      editMealMeasurement={true}
      />
    </div>
  );
};

export default EditMealMeasurement;
