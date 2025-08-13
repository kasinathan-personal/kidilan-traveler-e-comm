import React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useSelector } from 'react-redux';

const steps = ['Shipping', 'Payment', 'Review'];

const Checkout = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const items = useSelector(s => s.cart.items);
  const subtotal = items.reduce((sum, i) => sum + (i.price || 0) * i.quantity, 0);
  const shipping = 0;
  const tax = 0;
  const total = subtotal + shipping + tax;

  const [form, setForm] = React.useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const [errors, setErrors] = React.useState({});

  const update = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const validateShipping = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = 'Full name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.address.trim()) e.address = 'Address is required';
    if (!form.city.trim()) e.city = 'City is required';
    if (!form.postalCode.trim()) e.postalCode = 'Postal code is required';
    if (!form.country.trim()) e.country = 'Country is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const loadRazorpay = () => new Promise((resolve) => {
    if (window.Razorpay) { resolve(true); return; }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

  const handlePay = async () => {
    const ok = await loadRazorpay();
    if (!ok) { alert('Failed to load payment gateway.'); return; }
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID ,
      amount: Math.max(1, Math.round(total * 100)),
      currency: 'INR',
      name: 'Kidilan Traveler',
      description: 'Order Payment',
      handler: () => setActiveStep(2),
      prefill: {
        name: form.fullName,
        email: form.email,
      },
      theme: { color: '#27323d' },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleBack = () => setActiveStep((s) => Math.max(0, s - 1));
  const handleContinue = () => {
    if (activeStep === 0) {
      if (validateShipping()) setActiveStep(1);
      return;
    }
    if (activeStep === 2) {
      window.location.href = '/order/success';
      return;
    }
  };

  return (
    <div className="bg-white text-slate-900 min-h-screen">
      <div className="container py-10">
        <h1 className="font-display text-3xl mb-6 text-center">Checkout</h1>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => (
            <Step key={label}><StepLabel>{label}</StepLabel></Step>
          ))}
        </Stepper>
        <div className="mt-8 bg-white rounded-2xl p-6 max-w-3xl mx-auto shadow">
          {activeStep === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextField label="Full Name" variant="outlined" fullWidth value={form.fullName} onChange={update('fullName')} error={!!errors.fullName} helperText={errors.fullName || ''} />
              <TextField label="Email" variant="outlined" fullWidth value={form.email} onChange={update('email')} error={!!errors.email} helperText={errors.email || ''} />
              <TextField label="Address" variant="outlined" fullWidth className="md:col-span-2" value={form.address} onChange={update('address')} error={!!errors.address} helperText={errors.address || ''} />
              <TextField label="City" variant="outlined" fullWidth value={form.city} onChange={update('city')} error={!!errors.city} helperText={errors.city || ''} />
              <TextField label="Postal Code" variant="outlined" fullWidth value={form.postalCode} onChange={update('postalCode')} error={!!errors.postalCode} helperText={errors.postalCode || ''} />
              <TextField label="Country" variant="outlined" fullWidth value={form.country} onChange={update('country')} error={!!errors.country} helperText={errors.country || ''} />
            </div>
          )}
          {activeStep === 1 && (
            <div className="space-y-4 text-center">
              <Typography variant="body1">You will be redirected to Razorpay to complete your payment.</Typography>
              <div className="rounded-2xl border border-slate-100 p-4 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Subtotal</span>
                  <span className="text-slate-900 font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Shipping</span>
                  <span className="text-slate-900 font-medium">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Tax</span>
                  <span className="text-slate-900 font-medium">${tax.toFixed(2)}</span>
                </div>
                <Divider className="!my-2" />
                <div className="flex items-center justify-between text-base">
                  <span className="text-slate-900 font-semibold">Total</span>
                  <span className="text-slate-900 font-semibold">${total.toFixed(2)}</span>
                </div>
              </div>
              <Button variant="contained" color="primary" onClick={handlePay}>Pay with Razorpay</Button>
              <div className="text-slate-500 text-xs">Test key is used in development.</div>
            </div>
          )}
          {activeStep === 2 && (
            <div className="text-center">
              <Typography variant="h6" className="mb-2">Review</Typography>
              <Typography variant="body2" className="text-slate-600">Payment successful. Click to place order.</Typography>
            </div>
          )}
          <div className="mt-6 flex justify-between">
            <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
            {activeStep === 0 && (
              <Button variant="contained" onClick={handleContinue}>Continue</Button>
            )}
            {activeStep === 2 && (
              <Button variant="contained" color="primary" onClick={handleContinue}>Place Order</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 