import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";


const cartSlice = createSlice({
  name: "cart",
  initialState: {
    loading: true,
    data: null,
  },
  reducers: {
    changeLoad: (state, action) => {
      return {
        ...state,
        load: !state.load,
      };
    },
    setCartData: (state, action) => {
        state.data = {...action.payload}
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => {
        if (action.meta) {
          return action;
        }
      },
      (state, action) => {
        if (action.meta) {
          if (action.meta.requestStatus == "pending") {
            state.loading = true;
          }
          if (action.meta.requestStatus == "rejected") {
            state.loading = false;
          }
          if (action.meta.requestStatus == "fulfilled") {
            state.loading = false;
          }
        }
      },
    );
  },
});

export const cartActions = {
  ...cartSlice.actions
};

export const cartReducer = cartSlice.reducer;