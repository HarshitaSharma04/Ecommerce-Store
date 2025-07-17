import { createSlice } from "@reduxjs/toolkit";

// create state of cart
const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // add to cart
    addToCart: (state, action) => {
      const newItem = action.payload;
      console.log("payload item : ", newItem);

      // check existing items
      const existingItem = state.cartItems.find(
        (i) =>
          i.productId === newItem.productId && i.variantId === newItem.variantId
      );

      console.log("existing item:", existingItem);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push(newItem);
      }

      state.totalQuantity += 1;
      state.totalPrice += newItem.price;
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload; 

      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.id === itemId
      );

      if (existingItemIndex !== -1) {
        const item = state.cartItems[existingItemIndex];

        state.totalQuantity -= item.quantity;
        state.totalPrice -= item.price * item.quantity;

        state.cartItems.splice(existingItemIndex, 1); // remove item from array
      }
    },
  },
});

// export actions
export const { addToCart, removeFromCart } = cartSlice.actions;

// export reducer
export default cartSlice.reducer;
