import React from 'react';
import { supabase } from '../utils/supabaseClient';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const navigate = useNavigate();

  const handleConfirmPayment = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    await supabase
      .from('users')
      .update({ payment_complete: true })
      .eq('id', user.id);

    navigate('/today');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-pink-600 text-white px-4">
      <div className="bg-white/10 p-8 rounded-xl shadow-xl w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">Payment</h2>
        <p className="mb-6">This is a placeholder. Click below to simulate payment confirmation.</p>
        <button
          onClick={handleConfirmPayment}
          className="bg-white text-purple-700 font-semibold px-6 py-3 rounded-full hover:bg-purple-100 transition"
        >
          Confirm Payment
        </button>
      </div>
    </div>
  );
};

export default Payment;
