const { default: types } = require("../types");

let init_state = {
    productsData: []
}

export const myReducer = (state=init_state, action) => {
    switch (action.type) {
        case types.FETCH_PRODUCTS:
            return {...state, productsData: action.payload};
        default:
            return {...state};
    }
}