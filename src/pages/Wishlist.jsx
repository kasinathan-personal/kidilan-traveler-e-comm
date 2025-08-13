import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { addToCart } from '@/store/slices/cartSlice';
import { removeFromWishlist } from '@/store/slices/uiSlice';
import { getProductById } from '@/data/products';

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistIds = useSelector(s => s.ui.wishlist);
  const items = React.useMemo(() => wishlistIds.map(id => getProductById(id)).filter(Boolean), [wishlistIds]);

  return (
    <div className="bg-white text-slate-900 min-h-screen">
      <div className="container max-w-7xl mx-auto py-10">
        <div className="text-center mb-6">
          <h1 className="font-display text-3xl">Your Wishlist</h1>
          <p className="text-slate-600">Save items you love and move them to your cart anytime.</p>
        </div>

        {items.length === 0 ? (
          <div className="text-center bg-slate-50 rounded-2xl p-10">
            <div className="text-slate-600 mb-5">Your wishlist is empty.</div>
            <Button variant="contained" component={Link} to="/shop">Browse Products</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map(p => (
              <div key={p.id} className="bg-white rounded-2xl p-4 shadow">
                <Link to={`/product/${p.id}`} className="block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                    <img src={p.images?.[0]} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                </Link>
                <div className="mt-3 flex items-start justify-between gap-3">
                  <div>
                    <div className="font-medium">{p.name}</div>
                    <div className="text-slate-700 font-semibold">${p.price}</div>
                  </div>
                  <IconButton aria-label="remove" onClick={()=>dispatch(removeFromWishlist(p.id))}><DeleteOutlineIcon /></IconButton>
                </div>
                <div className="mt-3 flex gap-3">
                  <Button variant="contained" fullWidth onClick={()=>dispatch(addToCart({ id: p.id, name: p.name, price: p.price, image: p.images?.[0] }))}>Add to Cart</Button>
                  <Button variant="outlined" fullWidth component={Link} to={`/product/${p.id}`}>View</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist; 