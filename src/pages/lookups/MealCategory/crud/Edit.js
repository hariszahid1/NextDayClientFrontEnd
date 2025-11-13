import React, { useState,useEffect } from "react";
import MealForm from "./Form/MealCategoryForm";
import axios from "axios";
import { useParams } from "react-router-dom";
import { IndividualCategory } from "../../../../utils/Apis";
const EditMealCategory = () => {
  const [meal,setMeal]=useState({})
  const params = useParams();

  const GetMeal = async () => {
    await axios
      .get(`${IndividualCategory}/${params.id}`)
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
      editMealCategory={true}
      />
    </div>
  );
};

export default EditMealCategory;
