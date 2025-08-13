import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuantity, removeFromCart } from '@/store/slices/cartSlice';
import Button from '@mui/material/Button';

const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector(s => s.cart.items);
  const subtotal = items.reduce((sum, i) => sum + (i.price || 0) * i.quantity, 0);

  return (
    <div className="bg-white text-slate-900 min-h-screen">
      <div className="container py-10">
        <h1 className="font-display text-3xl mb-6">Your Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,360px] gap-8">
          <div className="space-y-4">
            {items.map(item => (
              <div key={item.id} className="flex gap-4 items-center bg-white rounded-2xl p-4 shadow">
                <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover" />
                <div className="flex-1">
                  <div>{item.name}</div>
                  <div className="text-slate-500 text-sm">{item.variant}</div>
                  <div className="mt-2 flex items-center gap-2">
                    <Button size="small" variant="outlined" onClick={()=>dispatch(updateQuantity({ id: item.id, quantity: Math.max(1, item.quantity - 1) }))}>-</Button>
                    <span>{item.quantity}</span>
                    <Button size="small" variant="outlined" onClick={()=>dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}>+</Button>
                    <Button size="small" color="error" onClick={()=>dispatch(removeFromCart(item.id))}>Remove</Button>
                  </div>
                </div>
                <div className="text-slate-900 font-semibold">${(item.price || 0).toFixed(2)}</div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-2xl p-4 h-max shadow">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span className="text-slate-900 font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="text-slate-600 text-sm mt-2">Shipping calculated at checkout.</div>
            <Button variant="contained" color="primary" className="mt-4" fullWidth>Checkout</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart; 