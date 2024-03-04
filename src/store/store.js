import { combineReducers, configureStore } from "@reduxjs/toolkit"
import productSlice from "./ProductSlice"

const rootReducer = combineReducers({
    products: productSlice
})

export const store = configureStore({
    reducer: rootReducer
})