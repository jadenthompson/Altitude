import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Payment = () => {
  const handleCheckout = async () => {
    const stripe = await stripePromise;

    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        priceId: import.meta.env.VITE_STRIPE_PRICE_ID,
      }),
    });

    const session = await response.json();
    await stripe.redirectToCheckout({ sessionId: session.id });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-md text-center">
        <h2 className="text-3xl font-bold mb-4 text-indigo-700">Upgrade to Pro</h2>
        <p className="mb-6 text-gray-600">Unlock all features, priority support, and full access.</p>
        <button
          onClick={handleCheckout}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-full transition"
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
};

export default Payment;
