import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import SectionTitle from '../../shared/SectionTitle/SectionTitle';
import CheckoutForm from './CheckoutForm';

// Ensure to use the correct prefix for Vite environment variables
console.log("Api key", import.meta.env.VITE_STRIPE_API_PK);
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API_PK);

const Payments = () => {
  return (
    <div className='mt-24'>
      <div>
        <SectionTitle header={'Please Pay Got Gold Membership'} />
      </div>
      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
};

export default Payments;