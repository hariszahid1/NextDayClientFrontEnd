import React, { useState,useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ClientForm from "./Form/ClientForm";
import { IndividualClient } from "../../../utils/Apis";

const EditClient = () => {
  const [client,setClient]=useState({})
  const params = useParams();

  const GetClient = async () => {
    await axios
      .get(`${IndividualClient}/${params.id}`)
      .then((res) => {
        setClient(res.data);
      });
  };

  useEffect(() => {
    GetClient();
  }, []);
  return (
    <div>
      <ClientForm 
      client={client}
      editMeal={true}
      />
    </div>
  );
};

export default EditClient;
