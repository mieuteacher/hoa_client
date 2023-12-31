import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

const find = createAsyncThunk("/find", async () => {
  let result = await api.users.find();
  return result.data;
});

const authenToken = createAsyncThunk("/authen-token", async () => {
  let result = await api.users.authenToken(
    {
      token: localStorage.getItem('token')
    }
  );
  return result.data;
});

const userSlice = createSlice({
  name: "user",
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
  },
  extraReducers: (builder) => {
    builder.addCase(find.fulfilled, (state, action) => {
      state.data = [...action.payload.data];
    });
    builder.addCase(authenToken.fulfilled, (state, action) => {
        state.data = action.payload.data;
    });
    builder.addCase(authenToken.rejected, (state, action) => {
      localStorage.removeItem("token");
    });
  },
});

export const userActions = {
  ...userSlice.actions,
  find,
  authenToken
};

export const userReducer = userSlice.reducer;
