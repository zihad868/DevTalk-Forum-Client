import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const CheckoutForm = () => {
  const {user} = useAuth();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [transactionId, setTransactionId] = useState('');
  const TotalAmount = 12;

  useEffect(() => {
    axiosSecure
      .post("/create-payment-intent", { price: TotalAmount })
      .then((res) => {
        if (res.data?.clientSecret) {
          setClientSecret(res.data?.clientSecret);
        }
      });
  }, [axiosSecure, TotalAmount]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    // Your payment processing logic here
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.error(error);
      setError(error?.message);
    } else {
      console.log(paymentMethod);
      setError("");
    }

    // Payment Intent
    const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
         card: card,
         billing_details: {
            email: user?.email || 'anonymous',
            name: user?.displayName || 'anonymous'
         }
      }
   });

   if(confirmError){
     console.error('Confirm Error')
   }

   else{
     console.log("Payment Intent",paymentIntent);
     if(paymentIntent.status === 'succeeded'){
        console.log("Transaction Id",paymentIntent.id);
        setTransactionId(paymentIntent.id);

        const paymentInfo = {
          name: user?.displayName,
          email: user?.email,
          transactionId: paymentIntent.id,
          amount: TotalAmount,
          date: new Date()
        }

        const res = await axiosSecure.post('/payment', paymentInfo);
        console.log(res.d)
     }
   }

  };

  return (
    <form className="mx-40 mt-12" onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "18px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button className="btn btn-info my-4" type="submit" disabled={!stripe || !clientSecret}>
        Pay
      </button>
      <p className="text-red-500">{error}</p>
      {transactionId && <p className="text-green-500"> Your Transaction Id: {transactionId}</p>}
    </form>
  );
};

export default CheckoutForm;
