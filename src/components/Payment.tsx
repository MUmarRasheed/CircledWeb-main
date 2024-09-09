import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { createStripeSession } from "../services/orders";
import Button from "./common/Button";
import Loading from "./common/Loading";
import "./Payment.scss";
import _404 from "./404";

const stripePromise = loadStripe(
  "pk_test_51K9TIySDcsNIJ0B2whR5ICiZ4vr8VcuFo5in3Ab3zSiQ3WWFvq9iOKJGdYPkSwHaQdA6RKtpcOwUNeCJOS073r7a00Qkyc3b2z"
);

function PaymentWrapper() {
  const { state }: any = useLocation();
  const [clientSecret, setClientSecret] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const { amount } = state;

    async function getToken() {
      const response = await createStripeSession(amount);
      setClientSecret(response.data.token);
      setLoading(false);
    }

    getToken();
  }, []);

  if (loading) return <Loading />;

  if (!state) {
    return <_404 />;
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret: clientSecret,
        appearance: {
          theme: "stripe",
        },
      }}
    >
      <Payment state={state} clientSecret={clientSecret} />
    </Elements>
  );
}

function Payment({ state, clientSecret }: any) {
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (!stripe || !elements || !clientSecret) {
      return;
    }

    setError("");
    setMessage("");

    stripe
      .retrievePaymentIntent(clientSecret)
      .then(({ paymentIntent }: any) => {
        localStorage.setItem(
          "paymentIntent",
          JSON.stringify({ id: paymentIntent.id, state: state })
        );

        switch (paymentIntent.status) {
          case "succeeded":
            setMessage("Payment succeeded!");

            // handlePayment();
            break;
          case "processing":
            setMessage("Your payment is processing.");
            break;
          case "requires_payment_method":
            setMessage("Please fill the form below to proceed.");
            break;
          default:
            setError("Something went wrong.");
            break;
        }
      });
  }, [stripe]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);
    const { error }: any = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: window.location.origin + "/orders/confirmation/complete",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (
      error.type === "card_error" ||
      error.type === "validation_error" ||
      error.type === "invalid_request_error"
    ) {
      setError(error.message);
    } else {
      setError("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <div className="max-500">
      <h1 className="title advent center">Payment</h1>
      <p className="center">
        Billing amount : <span className="cost-text"> £ {state.amount}</span>
      </p>
      {error && <p className="error-msg">{error}</p>}
      {message && <p className="error-msg success-msg">{message}</p>}
      <div className="max-500 pay-content">
        <form onSubmit={(e) => handleSubmit(e)}>
          <PaymentElement />
          <Button
            loading={isLoading}
            disabled={isLoading || !stripe || !elements}
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default PaymentWrapper;
