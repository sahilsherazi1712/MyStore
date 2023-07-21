import types from "../types"

export const createAddress = (addressData) => {
    return (dispatch) => {
        dispatch({
            type: types.CREATE_ADDRESS,
            payload: addressData,
        })
    }
}

export const updateAddress = (addressId, updatedData) => {
    return (dispatch) => {
        dispatch({
            type: types.UPDATE_ADDESS,
            payload: {addressId, updatedData},
        })
    }
}

export const removeAddress = (addressId) => {
    return (dispatch) => {
        dispatch({
            type: types.REMOVE_ADDRESS,
            payload: addressId,
        })
    }
}