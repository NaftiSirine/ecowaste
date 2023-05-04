import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

function Payment() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/orders/config").then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/orders/create-payment-intent", {
      method: "POST",
      body: JSON.stringify({}),
    }).then(async (result) => {
      var { clientSecret } = await result.json();
      setClientSecret(clientSecret);
    });
  }, []);

  return (
    <>
    <div>
      <h1 style={{color:"#4cc424",margin:"20px 100px"}}>Pay for your product</h1>
      
        {clientSecret && stripePromise && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm />
            </Elements>
        )}
    </div>
      
    </>
  );
}

export default Payment;
