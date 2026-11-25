import { createSlice } from '@reduxjs/toolkit';

const storagePrefix = 'nature.cart.';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    productAdded: (items, action) => {
      const { quantity = 1, ...product } = action.payload;
      const existing = items.find((item) => item.id === product.id);
      if (existing) existing.quantity += quantity;
      else items.push({ ...product, quantity });
    },
    productDecreased: (items, action) => {
      const existing = items.find((item) => item.id === action.payload);
      if (!existing) return;
      if (existing.quantity > 1) existing.quantity -= 1;
      else return items.filter((item) => item.id !== action.payload);
    },
    productRemoved: (items, action) => items.filter((item) => item.id !== action.payload),
    cartCleared: () => [],
    cartLoaded: (_, action) => action.payload,
  },
});

export const { productAdded, productDecreased, productRemoved, cartCleared, cartLoaded } = cartSlice.actions;

export const selectCartItems = (state) => state.cart;
export const selectCartCount = (state) => state.cart.reduce((sum, item) => sum + item.quantity, 0);
export const selectCartTotal = (state) => state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

export const cartStorageKey = (email) => storagePrefix + email;

export function loadCart(email) {
  if (!email) return [];
  try {
    const items = JSON.parse(localStorage.getItem(cartStorageKey(email)));
    const valid = Array.isArray(items) && items.every((item) =>
      (typeof item?.id === 'string' || Number.isInteger(item?.id)) && typeof item.name === 'string'
      && Number.isFinite(item.price) && Number.isInteger(item.quantity) && item.quantity > 0);
    return valid ? items : [];
  } catch {
    return [];
  }
}

export function saveCart(email, items) {
  if (!email) return;
  try {
    localStorage.setItem(cartStorageKey(email), JSON.stringify(items));
  } catch {}
}

export default cartSlice.reducer;
