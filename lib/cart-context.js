'use client';

import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const existing = state.find(i => i.id === action.payload.id && i.weight === action.payload.weight);
      if (existing) {
        return state.map(i =>
          i.id === action.payload.id && i.weight === action.payload.weight
            ? { ...i, qty: i.qty + action.payload.qty }
            : i
        );
      }
      return [...state, action.payload];
    }
    case 'UPDATE_QTY': {
      if (action.payload.qty <= 0) {
        return state.filter(i => !(i.id === action.payload.id && i.weight === action.payload.weight));
      }
      return state.map(i =>
        i.id === action.payload.id && i.weight === action.payload.weight
          ? { ...i, qty: action.payload.qty }
          : i
      );
    }
    case 'REMOVE':
      return state.filter(i => !(i.id === action.payload.id && i.weight === action.payload.weight));
    case 'CLEAR':
      return [];
    case 'HYDRATE':
      return action.payload;
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, []);

  // Persist to localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('kohan_cart');
      if (stored) dispatch({ type: 'HYDRATE', payload: JSON.parse(stored) });
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('kohan_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  const addToCart    = (product, weight, qty = 1) =>
    dispatch({ type: 'ADD', payload: { ...product, weight, qty, linePrice: product.priceMap[weight] } });
  const updateQty    = (id, weight, qty) => dispatch({ type: 'UPDATE_QTY', payload: { id, weight, qty } });
  const removeItem   = (id, weight) => dispatch({ type: 'REMOVE', payload: { id, weight } });
  const clearCart    = () => dispatch({ type: 'CLEAR' });

  const subtotal     = cart.reduce((s, i) => s + i.linePrice * i.qty, 0);
  const totalItems   = cart.reduce((s, i) => s + i.qty, 0);
  const shipping     = subtotal > 1500 ? 0 : 150;
  const grandTotal   = subtotal + shipping;

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQty, removeItem, clearCart, subtotal, totalItems, shipping, grandTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
