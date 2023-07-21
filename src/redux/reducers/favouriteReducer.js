import types from "../types";

let init_state = {
    favouriteItems: [],
}

export const favouriteReducer = (state = init_state, action) => {
    switch (action.type) {
        case types.ADD_TO_FAVOURITE:
            return {
                ...state,
                favouriteItems: [...state.favouriteItems, action.payload],
            };
        case types.REMOVE_FROM_FAVOURITE:
            return {
                ...state,
                favouriteItems: state.favouriteItems.filter((item) => item.id !== action.payload)
            }
        default:
            return state;
    }
}