import types from "../types"

export const addToFavourite = (product) => {
    return (dispatch) => {
        dispatch({
            type: types.ADD_TO_FAVOURITE,
            payload: product,
        })
    }
}

export const removeFromFavourite = (productId) => {
    return (dispatch) => {
        dispatch({
            type: types.REMOVE_FROM_FAVOURITE,
            payload: productId,
        })
    }
}