import types from "../types"

export const addToCart = (product) => {
    return (dispatch) => {
        dispatch({
            type: types.ADD_TO_CART,
            payload: product,
        })
    }
}

export const increaseCartItemQuantity = (productId) => {
    return (dispatch) => {
        dispatch({
            type: types.INCREASE_CART_ITEM_QUANTITY,
            payload: productId,
        })
    };
};

export const decreaseCartItemQuantity = (productId) => {
    return (dispatch) => {
        dispatch({
            type: types.DECREASE_CART_ITEM_QUANTITY,
            payload: productId,
        })
    };
};

export const removeFromCart = (productId) => {
    return (dispatch) => {
        dispatch({
            type: types.REMOVE_FROM_CART,
            payload: productId,
        })
    }
}
