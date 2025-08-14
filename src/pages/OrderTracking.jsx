import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import CircularProgress from '@mui/material/CircularProgress';
import { motion, AnimatePresence } from 'framer-motion';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import ImageWithFallback from '@/components/ImageWithFallback';
import { getProductById } from '@/service/api';

const steps = [
  { label: 'Order Placed', date: '20 Feb 2024', time: '11:00 AM', Icon: ShoppingCartCheckoutIcon },
  { label: 'Accepted', date: '20 Feb 2024', time: '11:15 AM', Icon: CheckCircleOutlineIcon },
  { label: 'In Progress', expected: 'Expected 21 Feb 2024', Icon: Inventory2OutlinedIcon },
  { label: 'On the Way', expected: 'Expected 22, 23 Feb 2024', Icon: LocalShippingOutlinedIcon },
  { label: 'Delivered', expected: 'Expected 24 Feb 2024', Icon: TaskAltOutlinedIcon },
];

const initialOrderItems = [
  { productId: '507f1f77bcf86cd799439011', meta: 'Color · Brown | Size · XXL', qty: 4 },
  { productId: '507f1f77bcf86cd799439012', meta: 'Color · Cream | Size · XXL', qty: 1 },
  { productId: '507f1f77bcf86cd799439013', meta: 'Color · Light Brown | Size · S', qty: 1 },
  { productId: '507f1f77bcf86cd799439014', meta: 'Color · Brown | Size · S', qty: 2 },
];

const StepIcon = (props) => {
  const { active, completed, className, icon } = props;
  const idx = Number(icon) - 1;
  const IconComp = steps[idx]?.Icon || TaskAltOutlinedIcon;
  const base = 'w-9 h-9 rounded-full grid place-items-center border';
  const state = completed || active ? 'bg-slate-900/5 text-slate-900 border-slate-300' : 'bg-white text-slate-500 border-slate-200';
  return (
    <span className={`${base} ${state} ${className}`}>
      <IconComp fontSize="small" />
    </span>
  );
};

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } },
};

const OrderTracking = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [trackingInput, setTrackingInput] = React.useState('');
  const [status, setStatus] = React.useState('idle'); // idle | loading | shown
  const [orderItems, setOrderItems] = React.useState([]);
  const isShown = status === 'shown';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!trackingInput.trim()) { return; }
    setStatus('loading');
    setTimeout(() => {
      const fetchOrderItems = async () => {
        try {
          const productPromises = initialOrderItems.map(async (item) => {
            const product = await getProductById(item.productId);
            return { ...item, product };
          });
          const resolvedItems = await Promise.all(productPromises);
          setOrderItems(resolvedItems.filter(item => item.product));
          setStatus('shown');
        } catch (error) {
          console.error("Failed to fetch order items", error);
          setStatus('idle');
        }
      };
      fetchOrderItems();
    }, 800);
  };

  React.useEffect(() => {
    if (status !== 'shown') return;
    setActiveStep(0);
    const t1 = setTimeout(() => setActiveStep(1), 350);
    return () => { clearTimeout(t1); };
  }, [status]);

  return (
    <div className="bg-white text-slate-900 min-h-screen px-4 sm:px-6">
      {/* Page header */}
      <div className="border-b border-slate-100 bg-slate-50/60">
        <div className="container py-8 text-center max-w-7xl mx-auto">
          <h1 className="font-display text-3xl">Track Your Order</h1>
          <div className="text-sm text-slate-500 mt-2">
            <span className="text-slate-400">Home</span>
            <span className="mx-2">/</span>
            <span className="text-slate-700">Track Your Order</span>
          </div>
        </div>
      </div>

      <div className="container py-8 max-w-7xl mx-auto space-y-6">
        {/* Order status & search */}
        <motion.div layout className="bg-white rounded-2xl p-6 shadow w-full">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <div className="font-medium">Order Status</div>
              <div className="text-slate-500 text-sm mt-1">
                Order ID: <span className="text-slate-700 font-medium">{isShown ? trackingInput : '—'}</span>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-2 w-full sm:w-auto">
              <TextField
                placeholder="Tracking ID or Mobile Number"
                size="small"
                value={trackingInput}
                onChange={(e)=>setTrackingInput(e.target.value)}
                className="w-full"
              />
              <Button variant="contained" size="medium" type="submit" disabled={status==='loading'}>
                {status==='loading' ? 'Checking…' : 'Track'}
              </Button>
            </form>
          </div>

          {/* Loading indicator */}
          <AnimatePresence initial={false}>
            {status==='loading' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center py-10">
                <CircularProgress size={28} className="mr-3" />
                <span className="text-slate-600">Fetching tracking details…</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stepper reveal */}
          <AnimatePresence>
            {isShown && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="mt-6 overflow-x-auto">
                <Stepper activeStep={activeStep} alternativeLabel className="min-w-[500px] sm:min-w-full">
                  {steps.map((s, i) => (
                    <Step key={s.label}>
                      <StepLabel StepIconComponent={StepIcon}>
                        <div className="text-slate-800 text-sm font-medium">{s.label}</div>
                        <div className="text-[12px] text-slate-500">
                          {i <= 1 ? (
                            <span>{s.date} • {s.time}</span>
                          ) : (
                            <span>{s.expected}</span>
                          )}
                        </div>
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Products list */}
        <AnimatePresence>
          {isShown && (
            <motion.div variants={containerVariants} initial="hidden" animate="show" exit={{ opacity: 0 }} className="bg-white rounded-2xl p-6 shadow w-full">
              <motion.div variants={itemVariants} className="font-medium mb-4">Products</motion.div>
              <div className="divide-y divide-slate-100">
                {orderItems.map((item, idx) => (
                  <motion.div
                    variants={itemVariants}
                    key={idx}
                    className="py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4"
                  >
                    <div className="w-full sm:w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                      <ImageWithFallback src={item.product.images?.[0]} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-slate-800">{item.product.name}</div>
                      <div className="text-slate-500 text-sm">{item.meta} | {item.qty} Qty.</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Benefits row */}
        <AnimatePresence>
          {isShown && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-center"
            >
              <div className="rounded-2xl border border-slate-100 p-5 bg-slate-50">
                <LocalShippingIcon className="text-slate-700 mx-auto" />
                <div className="mt-2 font-medium">Free Shipping</div>
                <div className="text-slate-500 text-sm">Free shipping for orders above $180</div>
              </div>
              <div className="rounded-2xl border border-slate-100 p-5 bg-slate-50">
                <CreditCardIcon className="text-slate-700 mx-auto" />
                <div className="mt-2 font-medium">Flexible Payment</div>
                <div className="text-slate-500 text-sm">Multiple secure payment options</div>
              </div>
              <div className="rounded-2xl border border-slate-100 p-5 bg-slate-50">
                <HeadsetMicIcon className="text-slate-700 mx-auto" />
                <div className="mt-2 font-medium">24x7 Support</div>
                <div className="text-slate-500 text-sm">We support online all days</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OrderTracking;
