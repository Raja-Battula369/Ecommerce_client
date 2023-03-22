import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';



const stripePromise = loadStripe(
  'pk_test_51MnclSSBWW2C0QnLvqbn61rnsOpMzPTZBHt0mngR8yJ5Tyg0yVa2Uhzrz6hzFJH7jHrEG7SQE8LhJSVozUe7cGGu00adeTtzS6'
);

const makePayment = async (cart) => {

  try {
    const stripe = await stripePromise;
    const res = await axios.post(`https://ecserver1.onrender.com/api/orders`, {
      products: cart.map(({ id, count }) => ({ id, count })),
    });
    await stripe.redirectToCheckout({
      sessionId: res.data.id,
    });
  } catch (error) {
    console.log(error);
  }
};

export default makePayment;