import React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { apiService } from '@/services/api';
import { useAsyncApi } from '@/hooks/useApi';
import { clearCart } from '@/store/slices/cartSlice';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';

const steps = ['Shipping', 'Payment', 'Review'];

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const items = useSelector(s => s.cart.items);
  const subtotal = items.reduce((sum, i) => sum + (i.price || 0) * i.quantity, 0);
  const shipping = 0;
  const tax = 0;
  const total = subtotal + shipping + tax;

  const { loading: orderLoading, error: orderError, execute: createOrder } = useAsyncApi(apiService.createOrder);
  const { loading: paymentLoading, error: paymentError, execute: createRazorpayOrder } = useAsyncApi(apiService.createRazorpayOrder);
  const { loading: verifyLoading, error: verifyError, execute: verifyPayment } = useAsyncApi(apiService.verifyRazorpayPayment);

  const [currentOrder, setCurrentOrder] = React.useState(null);

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

  const handleCreateOrder = async () => {
    try {
      const orderData = {
        orderItems: items.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount: total,
        paymentMethod: 'razorpay',
        shippingAddress: {
          street: form.address,
          city: form.city,
          state: form.city, // You might want to add a separate state field
          postalCode: form.postalCode,
          country: form.country
        }
      };

      const order = await createOrder(orderData);
      setCurrentOrder(order);
      return order;
    } catch (error) {
      console.error('Failed to create order:', error);
      throw error;
    }
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
    try {
      // Create order first if not already created
      let order = currentOrder;
      if (!order) {
        order = await handleCreateOrder();
      }

      // Create Razorpay order
      const razorpayData = await createRazorpayOrder(order._id);

    const ok = await loadRazorpay();
      if (!ok) { 
        throw new Error('Failed to load payment gateway.'); 
      }

    const options = {
        key: razorpayData.key_id,
        order_id: razorpayData.razorpayOrder.id,
        amount: razorpayData.razorpayOrder.amount,
        currency: razorpayData.razorpayOrder.currency,
      name: 'Kidilan Traveler',
      description: 'Order Payment',
        handler: async (response) => {
          try {
            await verifyPayment({
              orderId: order._id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });
            
            // Clear cart and redirect to success page
            dispatch(clearCart());
            navigate('/order/success');
          } catch (error) {
            console.error('Payment verification failed:', error);
            alert('Payment verification failed. Please contact support.');
          }
        },
      prefill: {
        name: form.fullName,
        email: form.email,
      },
      theme: { color: '#27323d' },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  const handleBack = () => setActiveStep((s) => Math.max(0, s - 1));
  const handleContinue = async () => {
    if (activeStep === 0) {
      if (validateShipping()) setActiveStep(1);
      return;
    }
    if (activeStep === 1) {
      await handlePay();
    }
  };

  // Show loading overlay
  if (orderLoading || paymentLoading || verifyLoading) {
    return <LoadingSpinner fullScreen message="Processing..." />;
  }

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
          {(orderError || paymentError || verifyError) && (
            <ErrorMessage 
              error={orderError || paymentError || verifyError} 
              className="mb-4"
            />
          )}

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
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handlePay}
                disabled={paymentLoading}
              >
                {paymentLoading ? 'Processing...' : 'Pay with Razorpay'}
              </Button>
            </div>
          )}
          <div className="mt-6 flex justify-between">
            <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
            {activeStep === 0 && (
              <Button 
                variant="contained" 
                onClick={handleContinue}
                disabled={orderLoading}
              >
                {orderLoading ? 'Creating Order...' : 'Continue'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 