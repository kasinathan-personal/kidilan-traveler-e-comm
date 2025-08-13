import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Button from '@mui/material/Button';

const OrderSuccess = () => {
  return (
    <div className="bg-white text-slate-900 min-h-screen flex items-center">
      <div className="container">
        <div className="mx-auto max-w-xl text-center bg-white rounded-2xl p-8 shadow">
          <div className="flex justify-center">
            <CheckCircleIcon className="text-slate-900" style={{ fontSize: 72 }} />
          </div>
          <h1 className="font-display text-3xl mt-4">Order Confirmed</h1>
          <p className="text-slate-600 mt-2">Your gear is being prepared. Estimated delivery in 3-5 business days.</p>
          <div className="mt-6 flex gap-3 justify-center">
            <Button variant="contained" href="/shop">Continue Shopping</Button>
            <Button variant="outlined">Share</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess; 