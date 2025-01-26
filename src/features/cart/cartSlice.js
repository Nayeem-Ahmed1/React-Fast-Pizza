import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCart(state, action) {
      state.cart.push(action.payload);
    },
    deleteCart(state, action) {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    increaseQuantity(state, action) {
      const tempCart = state.cart.find((item) => item.id === action.payload);

      tempCart.quantity = tempCart.quantity + 1;
      tempCart.totalPrice = tempCart.unitPrice * tempCart.quantity;
    },
    decreaseQuantity(state, action) {
      const tempCart = state.cart.find((item) => item.id === action.payload);

      tempCart.quantity--;
      tempCart.totalPrice = tempCart.unitPrice * tempCart.quantity;

      if (tempCart.quantity === 0) {
        state.cart = state.cart.filter((item) => item.id !== action.payload);
      }
    },
    emptyCart(state, action) {
      state.cart = [];
    },
  },
});

export const {
  addCart,
  deleteCart,
  increaseQuantity,
  decreaseQuantity,
  emptyCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getDuplicateOrder = (id) => (state) =>
  state.cart.cart.find((item) => item.id === id);

export const getTotalNumPizza = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalPizzaPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);
