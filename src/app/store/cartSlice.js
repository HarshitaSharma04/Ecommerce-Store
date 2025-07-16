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

      console.log("existing item:", existingItem)

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push(newItem);
      }

      state.totalQuantity += 1;
      state.totalPrice += newItem.price;
    },
  },
});

// export actions
export const { addToCart } = cartSlice.actions;

// export reducer
export default cartSlice.reducer;
