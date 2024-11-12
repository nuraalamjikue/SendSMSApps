import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '../../api';


const initialState = {
    products: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
};

// All Products
export const getAllProducts = createAsyncThunk(
    'getAllProducts',
    async (_, thunkApi) => { // Removed `thunkApi` argument as it's not used
        try {
            const response = await fetch('http://192.168.1.232:90/api/Supplier/productList');
            const data = await response.json();

            console.log('Response data:', data); // Moved console.log here

            return data; // Changed from `response.data` to `data`
        } catch (error) {
            console.log('Error fetching products:', error);
            throw error; // Throwing error to be caught in rejected case
        }
    },
);



const AllProductDataSlice = createSlice({
    name: 'AllProductDataSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        // getAllProducts cases
        builder.addCase(getAllProducts.pending, state => {
            state.isLoading = true;
        });
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.products = action.payload;
        });
        builder.addCase(getAllProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        });
    },
});

export default AllProductDataSlice.reducer;
