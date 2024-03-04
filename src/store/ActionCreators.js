import { Api } from "../Api";
import {fetching, fetchingError, setProducts, setSearchRes, setIds, initialize} from './ProductSlice'


export const getAllIds = () => async (dispatch) => {
    const ids = await Api.getAllIDs()
    dispatch(setIds(ids))
}

export const getSearchRes = (field, value) => async (dispatch) => {
    try {
        dispatch(fetching())
        const ids = await Api.filter(field, value)
        const products = await Api.getItems(ids)
        dispatch(setSearchRes({ids, products}))
    } catch (e) {
        console.log(e.message)
        dispatch(fetchingError(e.message))
    }
}

export const getProducts = (ids) => async (dispatch) => {
    try {
        dispatch(fetching())
        const products = await Api.getItems(ids)
        dispatch(setProducts(products))
    } catch (e) {
        console.log(e.message)
        dispatch(fetchingError(e.message))
    }
}

export const init = () => async (dispatch) => {
    try {
        dispatch(fetching())
        const allIds = await Api.getAllIDs()
        const ids = await Api.getIDs(0,50)
        const products = await Api.getItems(ids)
        dispatch(initialize({products, allIds}))
    } catch (e) {
        console.log(e.message)
        dispatch(fetchingError(e.message))
    }
}