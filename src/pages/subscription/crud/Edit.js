import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import SubscriptionForm from "./Form/SubscriptionForm";
import { IndividualClient } from "../../../utils/Apis";

const EditSubscription = () => {
  const [client, setClient] = useState({})
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
      <SubscriptionForm
        client={client}
        editMeal={true}
      />
    </div>
  );
};

export default EditSubscription;
