import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isCartOpen: false,
  wishlist: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleCart: (state, action) => {
      state.isCartOpen = action.payload ?? !state.isCartOpen;
    },
    addToWishlist: (state, action) => {
      const id = action.payload;
      if (!state.wishlist.includes(id)) state.wishlist.push(id);
    },
    removeFromWishlist: (state, action) => {
      const id = action.payload;
      state.wishlist = state.wishlist.filter(x => x !== id);
    },
  }
});

export const { toggleCart, addToWishlist, removeFromWishlist } = uiSlice.actions;
export default uiSlice.reducer; 