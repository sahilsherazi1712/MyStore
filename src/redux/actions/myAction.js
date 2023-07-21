import axios from "axios";
import types from "../types";

export const fetchProducts = () => {
    return async (dispatch) => {
        await axios.get('https://dummyjson.com/products?skip=0&limit=100')
            .then((response) => {
                const products = response?.data?.products
                // console.log("data====",products);
                dispatch({
                    type: types.FETCH_PRODUCTS, 
                    payload: products
                })
            })
            .catch((error) => {
                console.log("fetchProductsError", error);
            })
    }
}

