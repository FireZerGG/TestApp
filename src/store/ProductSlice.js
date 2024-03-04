import { createSlice } from "@reduxjs/toolkit";


const productSlice = createSlice({
    name: 'Product',
    initialState: {
        isLoading: false,
        error: '',
        ids: [],
        products: [],
        productsCount: 0,
    },
    reducers: {
        fetching(state) {
            state.isLoading = true
        },
        
        fetchingError(state, action) {
            state.isLoading = false
            state.error = action.payload
        },

        initialize(state, action) {
            state.isLoading = false
            state.error = ''
            let arr = action.payload.products

            for (let i = 1; i < arr.length; i++) {
                if (arr[i].id === arr[i-1].id) {
                    arr.splice(i, 1)
                }
            }

            state.products = arr
            state.ids = action.payload.allIds
        },

        setIds(state, action) {
            state.ids = action.payload
            state.error = ''
        },

        setProducts(state, action) {

            let arr = action.payload

            for (let i = 1; i < arr.length; i++) {
                if (arr[i].id === arr[i-1].id) {
                    arr.splice(i, 1)
                }
            }

            state.isLoading = false
            state.error = ''
            state.products = arr
        },

        setSearchRes(state, action) {
            state.isLoading = false
            state.error = ''
            state.ids = action.payload.ids

            let arr = action.payload.products
            for (let i = 1; i < arr.length; i++) {
                if (arr[i].id === arr[i-1].id) {
                    arr.splice(i, 1)
                }
            }
            state.products = arr.slice(0,50)
        }

    }
})

export default productSlice.reducer
export const {fetching, fetchingError, setProducts, setSearchRes, setIds, initialize} = productSlice.actions