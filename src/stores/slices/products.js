import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

const findProductById = createAsyncThunk("/findProductById", async (id) => {
    let result = await api.products.findProductById(id);
    return result.data;
});
const findAllCategory = createAsyncThunk(
    "/find_all_categories",
    async () => {
        let result = await api.products.findAllCategory();
        return result.data;
    });

const productSlice = createSlice({
    name: "product",
    initialState: {
        loading: true,
        data: null
    },
    extraReducers: (builder) => {
        builder.addCase(findProductById.fulfilled, (state, action) => {
            state.data = { ...action.payload.data };
        });
        builder.addCase(findAllCategory.fulfilled, (state, action) => {

            state.data = [...action.payload.data]
        });
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
    }
})

export const productActions = {
    ...productSlice.actions,
    findProductById,
    findAllCategory
}

export const productReducer = productSlice.reducer;