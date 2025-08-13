import React from 'react';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCart } from '@/store/slices/uiSlice';
import { updateQuantity, removeFromCart } from '@/store/slices/cartSlice';
import { Link } from 'react-router-dom';
import ImageWithFallback from '@/components/ImageWithFallback';

const CartDrawer = () => {
	const dispatch = useDispatch();
	const isOpen = useSelector(s => s.ui.isCartOpen);
	const items = useSelector(s => s.cart.items);

	const subtotal = items.reduce((sum, i) => sum + (i.price || 0) * i.quantity, 0);
	const shippingLabel = 'Free';
	const tax = 0;
	const total = subtotal + tax;

	return (
		<Drawer anchor="right" open={isOpen} onClose={() => dispatch(toggleCart(false))}>
			<div className="w-[92vw] sm:w-[560px] h-full bg-white text-slate-900 flex flex-col">
				<div className="flex items-center justify-between p-4">
					<Typography variant="h6" className="font-display">Your Cart</Typography>
					<IconButton onClick={() => dispatch(toggleCart(false))} color="inherit"><CloseIcon /></IconButton>
				</div>
				<Divider />
				<div className="flex-1 overflow-auto p-4 space-y-4">
					{items.length === 0 && (
						<Typography color="text.secondary">Your cart is empty.</Typography>
					)}
					{items.map(item => (
						<div key={item.id} className="rounded-2xl border border-slate-100 p-3">
							<div className="grid grid-cols-[24px_72px_1fr_auto] items-center gap-3">
								<IconButton size="small" color="inherit" onClick={() => dispatch(removeFromCart(item.id))} aria-label="remove">
									<CloseIcon fontSize="small" />
								</IconButton>
								<div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-100">
									<ImageWithFallback src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
								</div>
								<div className="min-w-0">
									<div className="text-sm text-slate-800 truncate">{item.name}</div>
									<div className="text-[12px] text-slate-500 truncate">{item.variant || '—'}</div>
									<div className="text-slate-900 font-semibold mt-1">${(item.price || 0).toFixed(2)}</div>
								</div>
								<div className="flex items-center gap-3">
									<div className="flex items-center gap-2">
										<IconButton size="small" color="inherit" onClick={() => dispatch(updateQuantity({ id: item.id, quantity: Math.max(1, item.quantity - 1) }))}><RemoveIcon fontSize="small" /></IconButton>
										<span className="w-6 text-center">{item.quantity}</span>
										<IconButton size="small" color="inherit" onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}><AddIcon fontSize="small" /></IconButton>
									</div>
									<div className="text-slate-900 font-semibold min-w-[64px] text-right">${(((item.price || 0) * item.quantity)).toFixed(2)}</div>
								</div>
							</div>
						</div>
					))}
				</div>
				<Divider />
				<div className="p-4">
					{items.length > 0 ? (
						<>
							<div className="rounded-2xl border border-slate-100 p-4">
								<div className="text-slate-700 font-medium mb-2">Cart Totals</div>
								<div className="space-y-2 text-sm">
									<div className="flex items-center justify-between">
										<span className="text-slate-600">Shipping (3-5 Business Days)</span>
										<span className="text-slate-900 font-medium">{shippingLabel}</span>
									</div>
									<div className="flex items-center justify-between">
										<span className="text-slate-600">TAX (estimated for United States)</span>
										<span className="text-slate-900 font-medium">${tax.toFixed(0)}</span>
									</div>
									<div className="flex items-center justify-between">
										<span className="text-slate-600">Subtotal</span>
										<span className="text-slate-900 font-medium">${subtotal.toFixed(2)}</span>
									</div>
									<Divider className="!my-2" />
									<div className="flex items-center justify-between text-base">
										<span className="text-slate-900 font-semibold">Total</span>
										<span className="text-slate-900 font-semibold">${total.toFixed(2)}</span>
									</div>
								</div>
							</div>
							<div className="mt-3">
								<Link to="/checkout" onClick={() => dispatch(toggleCart(false))}>
									<Button variant="contained" color="primary" fullWidth>Proceed to Checkout</Button>
								</Link>
								<div className="text-center mt-3">
									<Link to="/shop" onClick={() => dispatch(toggleCart(false))} className="text-slate-600 text-sm">Continue Shopping</Link>
								</div>
							</div>
						</>
					) : (
						<div className="mt-1">
							<Button variant="contained" color="primary" fullWidth disabled>Proceed to Checkout</Button>
							<div className="text-center mt-3">
								<Link to="/shop" onClick={() => dispatch(toggleCart(false))} className="text-slate-600 text-sm">Continue Shopping</Link>
							</div>
						</div>
					)}
				</div>
			</div>
		</Drawer>
	);
};

export default CartDrawer; 