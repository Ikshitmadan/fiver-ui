
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { newRequest } from '../../../Utils/newRequest';
import { useParams } from 'react-router-dom';
import { CheckoutForm } from "../Checkout/checkoutForm";
const stripePromise = loadStripe("pk_test_51MoMDSSIl4VwGEZmQ8HFgO0WHe0hYZBpgAjV42vGUVUvaimtpaEmsZWbaYiVHYHtMH66mjugmOewc8rbcdT1aFrv00oBqTaNWx");


export const Pay = () => {
    const {id}=useParams();

    
const [clientSecret, setClientSecret] = useState("");


useEffect(() => {
   newRequest.post(`/orders/${id}`).then((res) => setClientSecret(res.data.clientSecret));
  }, []);


  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <div className="pay">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm/>
        </Elements>
      )}
    </div>
  )
}


