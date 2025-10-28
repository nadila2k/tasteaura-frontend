import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find(i => i.id === item.id);
      
      if (existingItem) {
        if (existingItem.quantity < 10) { // max 10 items
          existingItem.quantity += 1;
          existingItem.totalPrice += item.price;
          state.totalQuantity += 1;
          state.totalPrice += item.price;
        }
      } else {
        state.items.push({ ...item, quantity: 1, totalPrice: item.price });
        state.totalQuantity += 1;
        state.totalPrice += item.price;
      }
    },
    removeItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find(i => i.id === id);
      if (!existingItem) return;

      state.totalQuantity -= existingItem.quantity;
      state.totalPrice -= existingItem.totalPrice;
      state.items = state.items.filter(i => i.id !== id);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
    decreaseItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find(i => i.id === id);
      if (!existingItem) return;

      existingItem.quantity -= 1;
      existingItem.totalPrice -= existingItem.price;
      state.totalQuantity -= 1;
      state.totalPrice -= existingItem.price;

      if (existingItem.quantity <= 0) {
        state.items = state.items.filter(i => i.id !== id);
      }
    },
  },
});

export const { addItem, removeItem, clearCart, decreaseItem } = cartSlice.actions;

export default cartSlice.reducer;
