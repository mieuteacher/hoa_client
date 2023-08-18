import { configureStore } from "@reduxjs/toolkit";

import { userReducer } from "./slices/user";
import { cartReducer } from "./slices/cart";
import { categoryReducer } from "./slices/catagory";
import { productReducer } from "./slices/products";


const store = configureStore({
  reducer: {
    userStore: userReducer,
    cartStore: cartReducer,
    categoryStore:categoryReducer,
    productStore:productReducer,
  },
});

export default store;